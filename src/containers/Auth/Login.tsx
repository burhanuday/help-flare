import React, { useState } from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Input from "../../components/Form/Input";
import axios from "../../axios/axios";
import { Formik } from "formik";
import * as yup from "yup";
import { Alert } from "@material-ui/lab";

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
});

const Login = (props: any) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div>
      <Container maxWidth="sm">
        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            padding: "30px 30px",
          }}
        >
          <Typography variant="h4">Social Connect</Typography>
          <Typography variant="body2" gutterBottom>
            Login for helper groups
          </Typography>

          <Formik
            validationSchema={schema}
            initialValues={{
              phone: "",
              password: "",
            }}
            onSubmit={(values, actions) => {
              const data = values;
              console.log(data);
              const formData = new FormData();
              formData.append("phone", data.phone);
              formData.append("password", data.password);

              actions.setSubmitting(true);
              axios
                .post(`/login`, formData)
                .then(response => {
                  console.log(response);
                  if (response.data.error === 0) {
                    setSuccessMessage("Logged in successfully!");
                    setErrorMessage("");
                    actions.resetForm();
                    localStorage.setItem(
                      "accessToken",
                      response.data.accessToken
                    );
                    window.location.reload();
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
                  placeholder="Enter password"
                  label="Password"
                  touched={props.touched.password}
                />

                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link style={{ textDecoration: "none" }} to="/auth/register">
                    <Button
                      disabled={props.isSubmitting}
                      color="primary"
                      style={{ marginRight: "15px" }}
                    >
                      Register instead
                    </Button>
                  </Link>
                  <Button
                    disabled={props.isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </div>
              </form>
            )}
          />
        </div>
      </Container>
    </div>
  );
};

export default Login;
