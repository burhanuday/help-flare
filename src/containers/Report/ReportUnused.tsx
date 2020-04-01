import React, { useState } from "react";
import Header from "../../components/Header/Header";
import {
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  IconButton,
  Icon
} from "@material-ui/core";
import { Room } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import GoogleMapReact from "google-map-react";
import axios from "../../axios/axios";
import { Alert } from "@material-ui/lab";
import Input from "../../components/Form/Input";
import { usePosition } from "use-position";
import MapMarker from "./MapMarker";
import { MapContainer } from "./MapContainer";

const Report: React.FC = (props: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { register, handleSubmit, errors, setValue, reset } = useForm();
  /*   const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    errorMessage
  } = usePosition(true, {
    enableHighAccuracy: false,
    timeout: 0,
    maximumAge: Infinity
  }); */

  const [error, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [markerLocations, setMarkerLocations] = useState<any>([]);

  const reportHandler = (data: any) => {
    console.log(data);
    return;
    const formData = new FormData();
    formData.append("phone", data.phone);
    formData.append("password", data.password);

    setLoading(true);
    axios
      .post(`/report_help`, formData)
      .then(response => {
        console.log(response);
        if (response.data.error === 0) {
          setSuccessMessage("Logged in successfully!");
          setErrorMessage("");
          reset();
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
      {/* {console.log(latitude, longitude)} */}
      {/* {console.log(errorMessage)} */}
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
              errorMessages={{
                maxLength: "Phone number should be 10 digits",
                minLength: "Phone number should be 10 digits"
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
            />

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between"
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
        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          style={{
            backgroundColor: "green"
          }}
        >
          <div style={{ height: matches ? "50vh" : "100vh", width: "100%" }}>
            <MapContainer />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Report;
