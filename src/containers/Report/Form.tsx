import React, { useContext, useState } from "react";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import axios from "../../axios/axios";
import { Formik } from "formik";
import { ProfileContext } from "../../contexts/ProfileContext";
import { Alert } from "@material-ui/lab";
import { InputAdornment, Button, CircularProgress } from "@material-ui/core";
import * as yup from "yup";
import OtpModal from "./OtpModal";
import { sendEvent, FIREBASE_REPORT_ERROR } from "../../util/analytics";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const schema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .length(10, "Phone number should be 10 digits"),
  name: yup.string().required("Name is required"),
  helpType: yup.array().required("Select the help type"),
});

const Form = (ogProps: any) => {
  const isLoggedIn = localStorage.getItem("accessToken") ? true : false;
  const { profileState, profileActions } = useContext(ProfileContext);
  const [error, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpModal, setOtpModal] = useState(false);

  let history = useHistory();
  const { t } = useTranslation();
  return (
    <>
      {otpModal && (
        <OtpModal
          visible={otpModal}
          setOtpModal={setOtpModal}
          setSuccessMessage={setSuccessMessage}
          getData={ogProps.getData}
        />
      )}
      <Formik
        validationSchema={schema}
        initialValues={{
          phone:
            profileState?.profile?.contact?.substring(
              3,
              profileState?.profile?.contact.length
            ) || "",
          name: profileState?.profile?.representative || "",
          helpType: [],
          message: "",
        }}
        onSubmit={(values, actions) => {
          const data = values;
          console.log(data);
          if (ogProps.markerLocations.length < 3) {
            setErrorMessage("Select at least three points on the map");
            setSuccessMessage("");
            actions.setSubmitting(false);
            return;
          } else {
            setErrorMessage("");
            setSuccessMessage("");
          }
          const maps = ogProps.mapsObject;
          console.log("befo ge", maps);
          const geoCoder = new maps.Geocoder();
          console.log(geoCoder);
          if (ogProps.markerLocations && ogProps.markerLocations[0]) {
            geoCoder.geocode(
              {
                location: new maps.LatLng({
                  lat: ogProps.markerLocations[0][0],
                  lng: ogProps.markerLocations[0][1],
                }),
              },
              (a: any) => {
                console.log("from geocode", a[4]);
                const locations = `${JSON.stringify(ogProps.markerLocations)}`;
                const formData = new FormData();
                formData.append("area_coordinates", locations);
                formData.append("reported_by", data.name);
                formData.append("phone", `+91${data.phone}`);
                formData.append("helpType", `${JSON.stringify(data.helpType)}`);
                formData.append("message", data.message);
                formData.append(
                  "place",
                  a[2].formatted_address ||
                    a[1].formatted_address ||
                    a[0].formatted_address
                );
                for (var value of formData.values()) {
                  console.log(value);
                }

                actions.setSubmitting(true);
                axios
                  .post(`/report_help`, formData)
                  .then(response => {
                    console.log(response);
                    if (response.data.error === 0) {
                      setSuccessMessage("");
                      setErrorMessage("");
                      ogProps.setMarkerLocations([]);
                      setOtpModal(true);
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
                    sendEvent(FIREBASE_REPORT_ERROR, error);
                  })
                  .finally(() => {
                    actions.setSubmitting(false);
                  });
              }
            );
          }
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
              size="small"
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
              size="small"
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

            <Select
              fullWidth
              name="helpType"
              onChange={props.setFieldValue}
              onBlur={props.handleBlur}
              value={props.values.helpType}
              error={props.errors.helpType}
              placeholder={"Select the help the area requires"}
              label={t("Help required(select multiple)")}
              touched={props.touched}
              options={[
                { title: `${t("Food")}`, value: "food" },
                { title: `${t("Water")}`, value: "water" },
                { title: `${t("Sanitation")}`, value: "sanitation" },
              ]}
              multiple
              size="small"
            />

            <span id="message_box">
              <Input
                required
                fullWidth
                multiline
                name="message"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.message}
                error={props.errors.message}
                disabled={props.isSubmitting}
                placeholder="eg. About 100 people living here need rice and other uncooked food items"
                label="More information"
                touched={props.touched.message}
                size="small"
              />
            </span>

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {props.isSubmitting && <CircularProgress size={24} />}
              <Button
                disabled={props.isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {t("Report")}
              </Button>
            </div>
          </form>
        )}
      />
    </>
  );
};

export default Form;
