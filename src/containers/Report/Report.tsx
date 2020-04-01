import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Grid, useTheme, useMediaQuery, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import GoogleMapReact from "google-map-react";
import axios from "../../axios/axios";
import { Alert } from "@material-ui/lab";
import Input from "../../components/Form/Input";
import MapMarker from "./MapMarker";

const defaultValues = {
  phone: "",
  reported_by: "",
  helpType: "",
};

const Report: React.FC = (props: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { register, handleSubmit, errors, setValue, reset } = useForm({
    defaultValues,
  });

  const [error, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [markerLocations, setMarkerLocations] = useState<any>([]);
  const [mapsObject, setMapsObject] = useState<any>(undefined);
  const [currentPolygon, setCurrentPolygon] = useState<any>(undefined);

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

  const reportHandler = (data: any) => {
    console.log(data);
    if (markerLocations.length < 3) {
      setErrorMessage("Select at least three points on the map");
      setSuccessMessage("");
      return;
    } else {
      setErrorMessage("");
      setSuccessMessage("");
    }
    const locations = `${JSON.stringify(markerLocations)}`;
    const formData = new FormData();
    formData.append("area_coordinates", locations);
    formData.append("reported_by", data.reported_by);
    formData.append("phone", data.phone);
    formData.append("helpType", data.helpType);

    setLoading(true);
    axios
      .post(`/report_help`, formData)
      .then(response => {
        console.log(response);
        if (response.data.error === 0) {
          setSuccessMessage("Submitted successfully!");
          setErrorMessage("");
          reset(defaultValues);
          setMarkerLocations([]);
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
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Header />
      <Grid
        container
        direction={matches ? "column-reverse" : "row"}
        spacing={0}
      >
        <Grid item xs={12} md={4} lg={3}>
          <form
            style={{ marginTop: "10px", padding: "0px 20px" }}
            onSubmit={handleSubmit(reportHandler)}
          >
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
              label="Name"
              placeholder="Enter your name"
              rules={{ required: true }}
              name="reported_by"
              register={register}
              setValue={setValue}
              errors={errors}
              disabled={loading}
            />

            <Input
              required
              fullWidth
              label="Phone"
              placeholder="Enter your phone number"
              rules={{ required: true, minLength: 10, maxLength: 10 }}
              name="phone"
              type="number"
              register={register}
              setValue={setValue}
              errors={errors}
              disabled={loading}
              errorMessages={{
                maxLength: "Phone number should be 10 digits",
                minLength: "Phone number should be 10 digits",
              }}
            />
            <p
              style={{ margin: 0, padding: 0, fontSize: "12px", color: "blue" }}
            >
              Your number will be used in case someone requires more information
              about the area you have reported
            </p>

            <Input
              required
              fullWidth
              multiline
              label="Help required"
              placeholder="State the nature of help required"
              rules={{ required: true }}
              name="helpType"
              register={register}
              setValue={setValue}
              errors={errors}
              disabled={loading}
            />

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Report
              </Button>
            </div>
          </form>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <div style={{ height: matches ? "50vh" : "100vh", width: "100%" }}>
            <GoogleMapReact
              /*   bootstrapURLKeys={{
                key: "AIzaSyB_6Gc31BMUDvuSEMz8AYWjTbza4UvytmQ"
              }} */
              options={() => ({
                fullscreenControl: false,
              })}
              defaultCenter={{
                lat: 19.0748,
                lng: 72.8856,
              }}
              defaultZoom={10}
              onClick={({ x, y, lat, lng, event }) => {
                console.log(lat, lng);
                setMarkerLocations([...markerLocations, [lat, lng]]);
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
                // map.setCenter({ lat: latitude, lng: longitude });
                /* var triangleCoords = [
                  { lat: 25.774, lng: -80.19 },
                  { lat: 18.466, lng: -66.118 },
                  { lat: 32.321, lng: -64.757 },
                  { lat: 25.774, lng: -80.19 },
                ]; */

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

export default Report;
