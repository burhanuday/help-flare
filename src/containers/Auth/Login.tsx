import React, { useState } from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Form/Input";
import axios from "../../axios/axios";

import { Alert } from "@material-ui/lab";

const Login = (props: any) => {
  const { register, handleSubmit, errors, setValue, reset } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("phone", data.phone);
    formData.append("password", data.password);

    setLoading(true);
    axios
      .post(`/login`, formData)
      .then(response => {
        console.log(response);
        if (response.data.error === 0) {
          setSuccessMessage("Logged in successfully!");
          setErrorMessage("");
          reset();
          localStorage.setItem("accessToken", response.data.accessToken);
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
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Container maxWidth="sm">
        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            padding: "30px 30px"
          }}
        >
          <Typography variant="h4">Social Connect</Typography>

          <form
            style={{ marginTop: "10px" }}
            onSubmit={handleSubmit(loginHandler)}
          >
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
              disabled={loading}
            />

            <Input
              required
              fullWidth
              type="password"
              label="Password"
              placeholder="Enter the password for your account"
              name="password"
              rules={{ required: true, minLength: 6, maxLength: 18 }}
              register={register}
              setValue={setValue}
              errors={errors}
              errorMessages={{
                minLength: "Password should be more than 6 characters",
                maxLength: "Password should be less than 18 characters"
              }}
              disabled={loading}
            />

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Link style={{ textDecoration: "none" }} to="/auth/register">
                <Button
                  disabled={loading}
                  color="primary"
                  style={{ marginRight: "15px" }}
                >
                  Register instead
                </Button>
              </Link>
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
