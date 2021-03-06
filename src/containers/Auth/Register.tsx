import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import LocationSearchInput from "../../components/LocationSearchInput/LocationSearchInput";
import axios from "../../axios/axios";
import { Formik } from "formik";
import * as yup from "yup";
import OtpModal from "./OtpModal";
import { sendEvent, FIREBASE_AUTH_ERROR } from "../../util/analytics";
import { useTranslation } from "react-i18next";

interface GeoData {
  latitude: string;
  longitude: string;
  address?: string;
  errorMessage?: string;
  isGeocoding?: boolean;
}

const schema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .length(10, "Phone number should be 10 digits"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be at least 6 characters")
    .max(18, "Password cannot be longer than 18 characters"),
  name: yup.string().required("Name is required"),
  organisation: yup.string().required("Organisation is required"),
  typeOfService: yup
    .array()
    .required("Select all kinds of helps that you can provide"),
});

const Register = (props: any) => {
  const APP_NAME = process.env.REACT_APP_NAME as string;
  const DEV = process.env.REACT_APP_DEVELOPER as string;

  const [geoData, setGeoData] = useState<GeoData>({
    latitude: "",
    longitude: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [agreedToConditions, setAgreedToConditions] = useState<boolean>(true);
  const { t } = useTranslation();
  return (
    <div>
      {otpModal && (
        <OtpModal
          visible={otpModal}
          setOtpModal={setOtpModal}
          setSuccessMessage={setSuccessMessage}
        />
      )}
      <Container maxWidth="sm">
        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            padding: "30px 30px",
          }}
        >
          <Typography variant="h4">{APP_NAME}</Typography>
          <Typography variant="body2" gutterBottom>
            Registration for NGOs or groups interested in helping
          </Typography>

          <Formik
            validationSchema={schema}
            initialValues={{
              phone: "",
              password: "",
              organisation: "",
              name: "",
              typeOfService: [],
            }}
            onSubmit={(values, actions) => {
              const data = values;
              console.log(data, geoData);

              if (!geoData.latitude || !geoData.longitude) {
                setShowAlert(true);
                actions.setSubmitting(false);
                return;
              } else {
                setShowAlert(false);
              }
              const formData = new FormData();
              formData.append("group_name", data.organisation);
              formData.append("representative", data.name);
              formData.append("phone", `+91${data.phone}`);
              formData.append("password", data.password);
              formData.append(
                "locality",
                JSON.stringify({
                  lat: geoData.latitude,
                  lng: geoData.longitude,
                  place: geoData.address,
                })
              );
              formData.append(
                "social_service",
                JSON.stringify(data.typeOfService)
              );

              actions.setSubmitting(true);

              axios
                .post(`/helper`, formData)
                .then(response => {
                  console.log(response);
                  if (response.data.error === 0) {
                    setSuccessMessage("");
                    setErrorMessage("");
                    actions.resetForm();
                    setGeoData({
                      latitude: "",
                      longitude: "",
                      address: "",
                    });
                    setOtpModal(true);
                  } else if (response.data.error === 1) {
                    setErrorMessage(response.data.message);
                    setSuccessMessage("");
                  }
                })
                .catch(error => {
                  console.log(error);
                  sendEvent(FIREBASE_AUTH_ERROR, error);
                  setErrorMessage("There was an error with the request");
                  setSuccessMessage("");
                })
                .finally(() => {
                  actions.setSubmitting(false);
                });
            }}
            render={props => (
              <form onSubmit={props.handleSubmit}>
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
                  fullWidth
                  name="name"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  error={props.errors.name}
                  disabled={props.isSubmitting}
                  placeholder="Enter details"
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
                  startAdornment={
                    <InputAdornment position="start">+91</InputAdornment>
                  }
                />
                <div
                  style={{
                    margin: "0px",
                    padding: "0px",
                    color: "blue",
                    fontSize: "0.8rem",
                  }}
                >
                  {t("We will send OTP on your phone")} <br />
                  {t("Groups or NGOs might contact you if required")}
                </div>

                <Input
                  fullWidth
                  required
                  name="organisation"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.organisation}
                  error={props.errors.organisation}
                  disabled={props.isSubmitting}
                  placeholder="Enter organisation name"
                  label="Organisation"
                  touched={props.touched.organisation}
                />

                <Input
                  required
                  fullWidth
                  type="password"
                  name="password"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                  error={props.errors.password}
                  disabled={props.isSubmitting}
                  placeholder="Enter Password"
                  label="Password"
                  touched={props.touched.password}
                />

                <LocationSearchInput
                  disabled={props.isSubmitting}
                  setGeoData={setGeoData}
                  geoData={geoData}
                />

                {showAlert && (
                  <Alert variant="filled" severity="error">
                    Enter the area your group is active in
                  </Alert>
                )}

                <Select
                  required
                  fullWidth
                  name="typeOfService"
                  onChange={props.setFieldValue}
                  onBlur={props.handleBlur}
                  value={props.values.typeOfService}
                  error={props.errors.typeOfService}
                  placeholder={t("Select all that you can provide")}
                  label={t("Select all that you can provide")}
                  touched={props.touched}
                  options={[
                    { title: `${t("Food")}`, value: "food" },
                    { title: `${t("Water")}`, value: "water" },
                    { title: `${t("Sanitation")}`, value: "sanitation" },
                  ]}
                  multiple
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    disabled={props.isSubmitting}
                    checked={agreedToConditions}
                    onChange={() => setAgreedToConditions(!agreedToConditions)}
                    name="agreedToConditions"
                  />
                  <span>
                    By registering you agree to the{" "}
                    <Link to="/terms-and-conditions">terms of service</Link> and
                    the <Link to="/privacy-policy">privacy policy</Link>
                  </span>
                </div>

                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link style={{ textDecoration: "none" }} to="/auth">
                    <Button
                      disabled={props.isSubmitting}
                      color="primary"
                      style={{ marginRight: "15px" }}
                    >
                      Login instead
                    </Button>
                  </Link>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {props.isSubmitting && <CircularProgress size={24} />}
                    <Button
                      disabled={props.isSubmitting || !agreedToConditions}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </form>
            )}
          />
        </div>
      </Container>
    </div>
  );
};

export default Register;
