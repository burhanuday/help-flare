import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header";
import { Grid, useTheme, useMediaQuery, Button } from "@material-ui/core";
import { geolocated, GeolocatedProps } from "react-geolocated";
import Joyride, { BeaconRenderProps, STATUS } from "react-joyride";
import Form from "./Form";
import SnackbarAlert from "./SnackbarAlert";
import {
  Map,
  GoogleApiWrapper,
  Polygon,
  InfoWindow,
  Marker,
} from "google-maps-react";
import socketIOClient from "socket.io-client";
import { sendEvent, FIREBASE_REPORT_OPENED } from "../../util/analytics";

const steps = [
  {
    target: "#step-1",
    content: `Zoom in and drop three markers to make an area. You can drop a marker by pressing the map`,
    disableBeacon: true,
    title: "Add markers",
  },
  {
    target: "#step-1",
    content: `You can remove a marker by clicking it again`,
    disableBeacon: true,
    title: "Remove markers",
  },
  {
    target: "#message_box",
    content: `Enter details about the needs here`,
    disableBeacon: true,
    title: "Enter details",
    // placement: "top-start",
    offset: 0,
  },
];

const Report = (ogProps: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  // const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [infoWindow, setInfoWindow] = useState<any>({
    visible: false,
    data: null,
    showConfirmDialog: false,
    result: null,
  });
  const [center, setCenter] = useState<any>(null);
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [markerLocations, setMarkerLocations] = useState<any>([]);
  const [mapsObject, setMapsObject] = useState<any>(undefined);
  const [showZoomAlert, setShowZoomAlert] = useState<boolean>(false);
  const [showMarkers, setShowMarkers] = useState<boolean>(true);
  const tutorialComplete = localStorage.getItem("tutorialComplete")
    ? true
    : false;

  const getData = useCallback(() => {
    console.log("from callback");
    socket?.emit("new_help", {
      lat: ogProps.coords.latitude,
      lng: ogProps.coords.longitude,
    });
  }, [ogProps.coords, socket]);

  useEffect(() => {
    sendEvent(FIREBASE_REPORT_OPENED);
  }, []);

  useEffect(() => {
    let socket: SocketIOClient.Socket;
    if (ogProps.isGeolocationAvailable && ogProps.isGeolocationEnabled) {
      if (
        ogProps.coords &&
        ogProps.coords.latitude &&
        ogProps.coords.longitude
      ) {
        socket = socketIOClient(process.env.REACT_APP_API_URL as string);
        console.log(socket);
        console.log("eitted", socket);
        setSocket(socket);
        socket.on("helps", (data: any) => {
          console.log("from gelps", data);
          setData(data);
        });
        socket.emit("new_help", {
          lat: ogProps.coords.latitude,
          lng: ogProps.coords.longitude,
        });
      }
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [
    ogProps.coords,
    ogProps.isGeolocationAvailable,
    ogProps.isGeolocationEnabled,
  ]);

  useEffect(() => {
    if (ogProps.coords) {
      setCenter({
        lat: ogProps.coords.latitude,
        lng: ogProps.coords.longitude,
      });
    }
  }, [ogProps.coords]);

  const Beacon = (props: any) => <Button {...props}>Show tutorial</Button>;

  return (
    <div>
      <Header title="Report" />
      {!tutorialComplete && (
        <Joyride
          beaconComponent={Beacon as React.ElementType<BeaconRenderProps>}
          steps={steps}
          callback={data => {
            const { action, index, status, type } = data;
            if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
              // Need to set our running state to false, so we can restart if we click start again.
              localStorage.setItem("tutorialComplete", "yes");
            }
          }}
        />
      )}
      <Grid
        container
        direction={matches ? "column-reverse" : "row"}
        spacing={0}
      >
        <Grid item xs={12} md={4} lg={3}>
          <Form
            isGeolocationEnabled={ogProps.isGeolocationEnabled}
            isGeolocationAvailable={ogProps.isGeolocationAvailable}
            setMarkerLocations={setMarkerLocations}
            mapsObject={mapsObject}
            markerLocations={markerLocations}
            getData={getData}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <div
            id="step-1"
            style={{
              height: matches ? "50vh" : "100vh",
              width: "100%",
            }}
          >
            <SnackbarAlert
              setShowZoomAlert={setShowZoomAlert}
              showZoomAlert={showZoomAlert}
            />
            {center && (
              <Map
                // @ts-ignore
                containerStyle={{
                  width: "100%",
                  position: "relative",
                }}
                onReady={(mapProps, map) => {
                  // @ts-ignore
                  const { google } = mapProps;
                  setMapsObject(google.maps);
                  console.log("google", google, google.maps);
                }}
                streetViewControl={false}
                disableDoubleClickZoom={true}
                gestureHandling="greedy"
                onCenter_changed={(a: any, b: any, c: any) => {
                  // console.log("b", b);
                  const lat = b.center.lat();
                  const lng = b.center.lng();
                  setCenter({
                    lat: lat,
                    lng: lng,
                  });
                }}
                onZoom_changed={(a: any, b: any, c: any) => {
                  let showMarkerInsteadOfPoly: boolean;
                  if (b.zoom) {
                    showMarkerInsteadOfPoly = b.zoom <= 15;
                    console.log("show markers", showMarkerInsteadOfPoly);
                    if (showMarkerInsteadOfPoly !== showMarkers) {
                      setShowMarkers(showMarkerInsteadOfPoly);
                    }
                  }
                }}
                initialCenter={{
                  lat: center
                    ? center.lat
                    : ogProps.coords
                    ? ogProps.coords.latitude
                    : 19.0748,
                  lng: center
                    ? center.lng
                    : ogProps.coords
                    ? ogProps.coords.longitude
                    : 72.8856,
                }}
                google={ogProps.google}
                zoom={14}
                onClick={(a: any, b: any, c: any) => {
                  console.log(a, b, c, c.latLng.lat(), c.latLng.lng());
                  const lat = c.latLng.lat();
                  const lng = c.latLng.lng();
                  const zoom = b.zoom;
                  if (zoom >= 16) {
                    setMarkerLocations([...markerLocations, [lat, lng]]);
                  } else {
                    setShowZoomAlert(true);
                  }
                }}
              >
                {markerLocations.map((loc: any, index: number) => {
                  return (
                    <Marker
                      key={`${loc[0]}${loc[1]}`}
                      title={`${index}`}
                      draggable={true}
                      name={`${index}`}
                      position={{ lat: loc[0], lng: loc[1] }}
                      onDragend={(a: any, b: any, c: any) => {
                        console.log(a, b, c);
                        const clone = JSON.parse(
                          JSON.stringify(markerLocations)
                        );
                        clone[index] = [c.latLng.lat(), c.latLng.lng()];
                        setMarkerLocations(clone);
                      }}
                      onClick={() => {
                        const newMarkerLocations = markerLocations.filter(
                          (location: any) =>
                            location[0] !== loc[0] && location[1] !== loc[1]
                        );
                        setMarkerLocations(newMarkerLocations);
                      }}
                    />
                  );
                })}
                {markerLocations.length > 2 && (
                  <Polygon
                    paths={markerLocations.map((coordinate: any) => ({
                      lat: coordinate[0],
                      lng: coordinate[1],
                    }))}
                    strokeColor="#FF0000"
                    strokeOpacity={0.8}
                    strokeWeight={2}
                    fillColor="#FF0000"
                    fillOpacity={0.35}
                  />
                )}
                {showMarkers &&
                  data.map((d: any) => {
                    const coordinates = d.area.coordinates[0];
                    const loc = coordinates[0];
                    const color = d.status ? "green" : "blue";
                    return (
                      <Marker
                        key={`${loc[0]}${loc[1]}`}
                        position={{ lat: loc[0], lng: loc[1] }}

                        /* onClick={() => {
                          const newMarkerLocations = markerLocations.filter(
                            (location: any) =>
                              location[0] !== loc[0] && location[1] !== loc[1]
                          );
                          setMarkerLocations(newMarkerLocations);
                        }} */
                      />
                    );
                  })}
                {!showMarkers &&
                  data.map((d: any) => {
                    const coordinates = d.area.coordinates[0];
                    const poly_lines = coordinates.map((coordinate: any) => ({
                      lat: coordinate[0],
                      lng: coordinate[1],
                    }));
                    const color = d.status ? "green" : "blue";
                    return (
                      <Polygon
                        key={`${coordinates[0][0]}${coordinates[0][1]}`}
                        paths={poly_lines}
                        strokeColor={color}
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor={color}
                        fillOpacity={0.35}
                      />
                    );
                  })}
              </Map>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY as string,
})(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(Report)
);
