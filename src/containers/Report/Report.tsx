import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import {
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import GoogleMapReact from "google-map-react";
import { geolocated, GeolocatedProps } from "react-geolocated";
import axios from "../../axios/axios";
import { Alert } from "@material-ui/lab";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import MapMarker from "./MapMarker";
import Joyride, { BeaconRenderProps, TooltipRenderProps } from "react-joyride";

const steps = [
  {
    target: "#step-1",
    content:
      `Zoom in till you see then satellite view
      \n then select at least 3 points on the map covering the area that needs help`,
    disableBeacon: true,
  },
];

const schema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .length(10, "Phone number should be 10 digits"),
  name: yup.string().required("Name is required"),
  helpType: yup.array().required("Select the help type"),
});

const Report: React.FC = (ogProps: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [markerLocations, setMarkerLocations] = useState<any>([]);
  const [mapsObject, setMapsObject] = useState<any>(undefined);
  const [currentPolygon, setCurrentPolygon] = useState<any>(undefined);
  const [showZoomAlert, setShowZoomAlert] = useState<boolean>(false);

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

  /*   useEffect(() => {
    if (mapsObject) {
      const { map, maps } = mapsObject;
      map.addListener("click", (event: any) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        console.log("loca", lat, lng);
        console.log(map.getZoom());
        if (map.getZoom() >= 17) {
          console.log("mark", markerLocations);
          setMarkerLocations([...markerLocations, [lat, lng]]);
        } else {
          setShowZoomAlert(true);
        }
      });
      map.addListener("click", function (e: any) {
        var marker = new maps.Marker({
          position: e.latLng,
          map: map,
        });
        map.panTo(e.latLng);
      });
    }
  }, [mapsObject, setMarkerLocations]); */

  const handleAlertClosed = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setShowZoomAlert(false);
  };

  const Beacon = (props: any) => <Button {...props}>Show tutorial</Button>;

  return (
    <div>
      <Header />
      <Joyride
        beaconComponent={Beacon as React.ElementType<BeaconRenderProps>}
        steps={steps}
      />
      <Grid
        container
        direction={matches ? "column-reverse" : "row"}
        spacing={0}
      >
        <Grid item xs={12} md={4} lg={3}>
          <Formik
            validationSchema={schema}
            initialValues={{
              phone: "",
              name: "",
              helpType: [],
            }}
            onSubmit={(values, actions) => {
              const data = values;
              console.log(data);
              if (markerLocations.length < 3) {
                setErrorMessage("Select at least three points on the map");
                setSuccessMessage("");
                actions.setSubmitting(false);
                return;
              } else {
                setErrorMessage("");
                setSuccessMessage("");
              }
              const locations = `${JSON.stringify(markerLocations)}`;
              const formData = new FormData();
              formData.append("area_coordinates", locations);
              formData.append("reported_by", data.name);
              formData.append("phone", data.phone);
              formData.append("helpType", `${JSON.stringify(data.helpType)}`);
              for (var value of formData.values()) {
                console.log(value);
              }

              actions.setSubmitting(true);
              axios
                .post(`/report_help`, formData)
                .then(response => {
                  console.log(response);
                  if (response.data.error === 0) {
                    setSuccessMessage("Submitted successfully!");
                    setErrorMessage("");
                    setMarkerLocations([]);
                    actions.resetForm();
                  } else if (response.data.error === 1) {
                    setErrorMessage(response.data.message);
                    setSuccessMessage("");
                  }
                })
                .catch(error => {
                  console.log(error);
                  setErrorMessage("There was an error with the request");
                  setSuccessMessage("");
                })
                .finally(() => {
                  actions.setSubmitting(false);
                });
            }}
            render={props => (
              <form
                style={{
                  padding: "20px 20px",
                }}
                onSubmit={props.handleSubmit}
              >
                {!ogProps.isGeolocationAvailable && (
                  <Alert variant="filled" severity="warning">
                    Your browser does not support Geolocation
                  </Alert>
                )}

                {!ogProps.isGeolocationEnabled && (
                  <Alert variant="filled" severity="warning">
                    Geolocation is not enabled. Give location permission for a
                    better experience
                  </Alert>
                )}

                {error && (
                  <Alert variant="filled" severity="error">
                    {error}
                  </Alert>
                )}

                {successMessage && (
                  <Alert variant="filled" severity="success">
                    {successMessage}
                  </Alert>
                )}
                <Input
                  required
                  fullWidth
                  name="name"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  error={props.errors.name}
                  disabled={props.isSubmitting}
                  placeholder="Enter name"
                  label="Name"
                  touched={props.touched.name}
                />

                <Input
                  required
                  fullWidth
                  type="number"
                  name="phone"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.phone}
                  error={props.errors.phone}
                  disabled={props.isSubmitting}
                  placeholder="Enter phone"
                  label="Phone"
                  touched={props.touched.phone}
                />

                <Select
                  fullWidth
                  name="helpType"
                  onChange={props.setFieldValue}
                  onBlur={props.handleBlur}
                  value={props.values.helpType}
                  error={props.errors.helpType}
                  placeholder={"Select the help the area requires"}
                  label="Help required (select multiple)"
                  touched={props.touched}
                  options={[
                    { title: "Food", value: "food" },
                    { title: "Water", value: "water" },
                    { title: "Sanitation", value: "sanitation" },
                  ]}
                  multiple
                />

                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    disabled={props.isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Report
                  </Button>
                </div>
              </form>
            )}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <div
            id="step-1"
            style={{ height: matches ? "50vh" : "100vh", width: "100%" }}
          >
            <Snackbar
              open={showZoomAlert}
              autoHideDuration={3000}
              onClose={handleAlertClosed}
            >
              <Alert
                onClose={event => setShowZoomAlert(false)}
                severity="error"
                variant="filled"
              >
                Zoom in more till you see a satellite view to select an area
              </Alert>
            </Snackbar>
            <GoogleMapReact
              /*   bootstrapURLKeys={{
                key: "AIzaSyB_6Gc31BMUDvuSEMz8AYWjTbza4UvytmQ"
              }} */
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
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Report);
