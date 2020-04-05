import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Grid, useTheme, useMediaQuery, Button } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { geolocated, GeolocatedProps } from "react-geolocated";
import MapMarker from "./MapMarker";
import Joyride, { BeaconRenderProps, STATUS } from "react-joyride";
import Form from "./Form";
import SnackbarAlert from "./SnackbarAlert";

const steps = [
  {
    target: "#step-1",
    content: `Zoom in till you see then satellite view
      \n then select at least 3 points on the map covering the area that needs help`,
    disableBeacon: true,
  },
];

const Report: React.FC = (ogProps: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [markerLocations, setMarkerLocations] = useState<any>([]);
  const [mapsObject, setMapsObject] = useState<any>(undefined);
  const [currentPolygon, setCurrentPolygon] = useState<any>(undefined);
  const [showZoomAlert, setShowZoomAlert] = useState<boolean>(false);
  const tutorialComplete = localStorage.getItem("tutorialComplete")
    ? true
    : false;

  useEffect(() => {
    if (mapsObject) {
      const { map, maps } = mapsObject;
      if (ogProps.isGeolocationAvailable && ogProps.isGeolocationEnabled) {
        if (
          ogProps.coords &&
          ogProps.coords.latitude &&
          ogProps.coords.longitude
        ) {
          console.log("triggered");
          map.setCenter({
            lat: ogProps.coords.latitude,
            lng: ogProps.coords.longitude,
          });
        }
      }
    }
  }, [
    mapsObject,
    ogProps.coords,
    ogProps.isGeolocationAvailable,
    ogProps.isGeolocationEnabled,
  ]);

  useEffect(() => {
    if (mapsObject) {
      const { map, maps } = mapsObject;
      const triangleCoords = markerLocations.map((loc: any) => ({
        lat: loc[0],
        lng: loc[1],
      }));

      if (currentPolygon) {
        currentPolygon.setMap(null);
      }

      // Construct the polygon.
      var bermudaTriangle = new maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#0000FF",
        strokeOpacity: 0.6,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.35,
      });
      bermudaTriangle.setMap(map);
      setCurrentPolygon(bermudaTriangle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerLocations, mapsObject]);

  const Beacon = (props: any) => <Button {...props}>Show tutorial</Button>;

  return (
    <div>
      <Header />
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
          />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <div
            id="step-1"
            style={{ height: matches ? "50vh" : "100vh", width: "100%" }}
          >
            <SnackbarAlert
              setShowZoomAlert={setShowZoomAlert}
              showZoomAlert={showZoomAlert}
            />
            <GoogleMapReact
              options={() => ({
                fullscreenControl: false,
                zoomControl: false,
                gestureHandling: "greedy",
              })}
              defaultCenter={{
                lat: 19.0748,
                lng: 72.8856,
              }}
              defaultZoom={10}
              onClick={({ x, y, lat, lng, event }) => {
                // console.log(lat, lng);
                // console.log(mapsObject.map.getZoom());
                if (mapsObject.map.getZoom() >= 17) {
                  setMarkerLocations([...markerLocations, [lat, lng]]);
                } else {
                  setShowZoomAlert(true);
                }
              }}
              onChange={({ center, zoom, bounds, marginBounds }) => {
                // console.log(center, zoom);
                if (zoom >= 17) {
                  // console.log(mapsObject.map.getMapTypeId());
                  if (mapsObject.map.getMapTypeId() !== "satellite") {
                    mapsObject.map.setMapTypeId("satellite");
                  }
                } else if (
                  mapsObject &&
                  mapsObject.map &&
                  mapsObject.map.getMapTypeId() !== "roadmap"
                ) {
                  mapsObject.map.setMapTypeId("roadmap");
                }
              }}
              onChildClick={(a, b) => {
                console.log(a, b);
                const newMarkerLocations = markerLocations.filter(
                  (location: any) =>
                    location[0] !== b.loc[0] && location[1] !== b.loc[1]
                );
                setMarkerLocations(newMarkerLocations);
              }}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => {
                console.log(map, maps);

                setMapsObject({ map, maps });
              }}
            >
              {markerLocations.map((loc: any, index: number) => (
                <MapMarker
                  key={`${loc[0]}${loc[1]}`}
                  lat={loc[0]}
                  lng={loc[1]}
                  loc={loc}
                  index={index}
                />
              ))}
            </GoogleMapReact>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Report);
