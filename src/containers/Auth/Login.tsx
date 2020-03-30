import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Login = (props: any) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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

          <form style={{ marginTop: "10px" }}>
            <TextField
              type="number"
              required
              style={{ marginTop: "15px" }}
              fullWidth
              label="Phone"
              placeholder="Enter your phone number"
              variant="outlined"
              value={phone}
              onChange={event => setPhone(event.target.value)}
            />

            <TextField
              required
              style={{ marginTop: "15px" }}
              fullWidth
              type="password"
              label="Password"
              placeholder="Enter your password"
              variant="outlined"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Link to="/auth/register">
                <Button color="primary" style={{ marginRight: "15px" }}>
                  Register instead
                </Button>
              </Link>
              <Button variant="contained" color="primary">
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
