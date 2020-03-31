import React from "react";
import { Container, Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Form/Input";

const Login = (props: any) => {
  const { register, handleSubmit, errors, setValue, reset } = useForm();

  const loginHandler = (data: any) => {
    console.log(data);
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

          <form
            style={{ marginTop: "10px" }}
            onSubmit={handleSubmit(loginHandler)}
          >
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

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Link style={{ textDecoration: "none" }} to="/auth/register">
                <Button color="primary" style={{ marginRight: "15px" }}>
                  Register instead
                </Button>
              </Link>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
