import React, { useState } from "react";
import { Container, Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Form/Input";
import LocationSearchInput from "../../components/LocationSearchInput/LocationSearchInput";

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

  const registerHandler = (data: any) => {
    console.log(data, geoData);
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

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Link style={{ textDecoration: "none" }} to="/auth">
                <Button color="primary" style={{ marginRight: "15px" }}>
                  Login instead
                </Button>
              </Link>
              <Button type="submit" variant="contained" color="primary">
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
