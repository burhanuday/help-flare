import React, { useState } from "react";
import { Container, Paper, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Form/Input";
import LocationSearchInput from "../../components/LocationSearchInput/LocationSearchInput";
import axios from "../../axios/axios";

interface GeoData {
  latitude: string;
  longitude: string;
  address?: string;
  errorMessage?: string;
  isGeocoding?: boolean;
}

const Register = (props: any) => {
  const { register, handleSubmit, errors, setValue, reset } = useForm();

  const [geoData, setGeoData] = useState<GeoData>({
    latitude: "",
    longitude: ""
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const registerHandler = (data: any) => {
    console.log(data, geoData);

    if (!geoData.latitude || !geoData.longitude) {
      setShowAlert(true);
      return;
    } else {
      setShowAlert(false);
    }

    const formData = new FormData();
    formData.append("group_name", data.organisation);
    formData.append("representative", data.name);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append(
      "locality",
      JSON.stringify({
        lat: geoData.latitude,
        lng: geoData.longitude
      })
    );
    formData.append("social_service", data.typeOfService);

    setLoading(true);

    axios
      .post(`/helper`, formData)
      .then(response => {
        console.log(response);
        if (response.data.error === 0) {
          setSuccessMessage("Registered successfully!");
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
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            padding: "30px 30px"
          }}
        >
          <Typography variant="h4">Social Connect</Typography>
          <Typography variant="body2" gutterBottom>
            Registration for NGOs or groups interested in helping
          </Typography>

          <form onSubmit={handleSubmit(registerHandler)}>
            {errorMessage && (
              <Alert variant="filled" severity="error">
                {errorMessage}
              </Alert>
            )}

            {successMessage && (
              <Alert variant="filled" severity="success">
                {successMessage}
              </Alert>
            )}

            <Input
              required
              style={{ marginTop: "25px" }}
              fullWidth
              label="Name"
              placeholder="Enter your name"
              rules={{ required: true, minLength: 5 }}
              name="name"
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

            <Input
              fullWidth
              label="Organisation (optional)"
              placeholder="Enter your organisation name (if any)"
              name="organisation"
              rules={{ required: true }}
              register={register}
              setValue={setValue}
              errors={errors}
            />

            <Input
              required
              fullWidth
              type="password"
              label="Password"
              placeholder="Create a password for your account"
              name="password"
              rules={{ required: true, minLength: 6, maxLength: 18 }}
              register={register}
              setValue={setValue}
              errors={errors}
              errorMessages={{
                minLength: "Password should be more than 6 characters",
                maxLength: "Password should be less than 18 characters"
              }}
            />

            <LocationSearchInput setGeoData={setGeoData} />

            {showAlert && (
              <Alert variant="filled" severity="error">
                Enter the area your group is active in
              </Alert>
            )}

            <Input
              fullWidth
              label="Type of service (optional)"
              placeholder="State how you can help"
              name="typeOfService"
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
              <Link style={{ textDecoration: "none" }} to="/auth">
                <Button
                  disabled={loading}
                  color="primary"
                  style={{ marginRight: "15px" }}
                >
                  Login instead
                </Button>
              </Link>
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </div>
          </form>

          {/* <p>{geoData.latitude}</p>
          <p>{geoData.longitude}</p>
          <p>{geoData.address}</p> */}
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
