import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header/Header";
import socketIOClient from "socket.io-client";
import { geolocated } from "react-geolocated";
import GoogleMapReact from "google-map-react";
import Polygon from "./Polygon";
// import Svg from "../../components/Map/SVG";

const Help: React.FC = (ogProps: any) => {
  const [polygons, setPolygons] = useState<any>([]);
  const [mapsObject, setMapsObject] = useState<any>(undefined);
  const [data, setData] = useState<any>([]);
  const [zoomLevel, setZoom] = useState<any>(14);

  const drawPoly = useCallback(
    (data: any) => {
      const newPolygons: any[] = [];

      for (let i = 0; i < data.length; i++) {
        const coordinates = data[i].area.coordinates[0];
        const poly_lines = coordinates.map(
          (coordinate: any) =>
            new mapsObject.maps.LatLng(coordinate[0], coordinate[1])
        );

        const polygon = new mapsObject.maps.Polygon({
          path: poly_lines,
          strokeColor: "#0000FF",
          strokeOpacity: 0.6,
          strokeWeight: 2,
          fillColor: "#0000FF",
          fillOpacity: 0.35,
          map: mapsObject.map,
        });
        polygon.addListener("click", (event: any) => {
          const infoWindow = new mapsObject.maps.InfoWindow();
          infoWindow.setContent(`
            <p>Reported by: <b>${data[0].reported_by}</b></p>
            <p>Phone: <b>${data[0].phone}</b></p>
            <p>Type of help required: <b>${data[0].type_of_help.join(
              ", "
            )}</b></p>
          `);
          infoWindow.setPosition(event.latLng);

          infoWindow.open(mapsObject.map);
        });
        newPolygons.push(polygon);
      }

      console.log("polygons", polygons);
      console.log("new_polygons", newPolygons);
      polygons.forEach((poly: any) => {
        console.log(poly);
        poly.setMap(null);
      });
      if (newPolygons.length !== polygons.length) {
        setPolygons(newPolygons);
      }
    },
    [mapsObject, polygons]
  );

  useEffect(() => {
    let socket: SocketIOClient.Socket;
    if (ogProps.isGeolocationAvailable && ogProps.isGeolocationEnabled) {
      if (
        ogProps.coords &&
        ogProps.coords.latitude &&
        ogProps.coords.longitude
      ) {
        if (mapsObject) {
          mapsObject.map.setCenter({
            lat: ogProps.coords.latitude,
            lng: ogProps.coords.longitude,
          });
          mapsObject.map.setZoom(14);
        }
        socket = socketIOClient(process.env.REACT_APP_API_URL as string);
        socket.emit("new_help", {
          lat: ogProps.coords.latitude,
          lng: ogProps.coords.longitude,
        });
        /*  socket.emit("new_help", {
          lat: ogProps.coords.latitude,
          lng: ogProps.coords.longitude,
        }); */
        /* setInterval(() => {
          socket.emit("new_help", {
            lat: ogProps.coords.latitude,
            lng: ogProps.coords.longitude,
          });
        }, 4000); */
        socket.on("helps", (data: any) => {
          console.log(data);
          setData(data);
          // setPolygons(data);
          if (mapsObject) {
            drawPoly(data);
          }
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
    mapsObject,
    drawPoly,
  ]);

  return (
    <div>
      <Header />
      <div
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
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
            /* if (mapsObject.map.getZoom() >= 17) {
            setMarkerLocations([...markerLocations, [lat, lng]]);
          } else {
            setShowZoomAlert(true);
          } */
          }}
          onChange={({ center, zoom, bounds, marginBounds }) => {
            if (zoom !== zoomLevel) {
              setZoom(zoom);
            }
            // console.log(center, zoom);
            /* if (zoom >= 17) {
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
          } */
          }}
          onChildClick={(a, b) => {
            /*    console.log(a, b);
          const newMarkerLocations = markerLocations.filter(
            (location: any) =>
              location[0] !== b.loc[0] && location[1] !== b.loc[1]
          );
          setMarkerLocations(newMarkerLocations); */
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            /*   console.log(map, maps); */

            setMapsObject({ map, maps });
          }}
        >
          {/* {markerLocations.map((loc: any, index: number) => (
          <MapMarker
            key={`${loc[0]}${loc[1]}`}
            lat={loc[0]}
            lng={loc[1]}
            loc={loc}
            index={index}
          />
        ))} */}
          {/* <Polygon
              key={`${loc[0]}${loc[1]}`}
              lat={loc[0]}
              lng={loc[1]}
              coordinates={d.area.coordinates[0]}
              zoom={zoomLevel}
              svgCoordinate={loc}
            /> */}
         {/*  {data.map((d: any) => {
            const loc = d.area.coordinates[0][0];
            return (
              <Svg
                lat={loc[0]}
                lng={loc[1]}
                coordinates={{
                  lat: d.area.coordinates[0][0],
                  lng: d.area.coordinates[0][1],
                }}
                bounds={this.state.bounds}
                zoom={this.state.zoom}
                height={this.refs[ref] ? this.refs[ref].offsetHeight : 0}
                width={this.refs[ref] ? this.refs[ref].offsetWidth : 0}
              />
            );
          })} */}
        </GoogleMapReact>
        {console.log("checking value", polygons)}
      </div>
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Help);
