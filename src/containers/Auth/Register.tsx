import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import LocationSearchInput from "../../components/LocationSearchInput/LocationSearchInput";

interface GeoData {
  latitude: string;
  longitude: string;
  address?: string;
  errorMessage?: string;
  isGeocoding?: boolean;
}

const Register = (props: any) => {
  const [geoData, setGeoData] = useState<GeoData>({
    latitude: "",
    longitude: ""
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [organisation, setOrganisation] = useState("");
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
          <Typography variant="body2" gutterBottom>
            Registration for NGOs or groups interested in helping
          </Typography>

          <TextField
            required
            style={{ marginTop: "25px" }}
            fullWidth
            label="Name"
            placeholder="Enter your name"
            variant="outlined"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <TextField
            required
            style={{ marginTop: "15px" }}
            fullWidth
            type="number"
            label="Phone"
            placeholder="Enter your phone number"
            variant="outlined"
            value={phone}
            onChange={event => setPhone(event.target.value)}
          />

          <TextField
            style={{ marginTop: "15px" }}
            fullWidth
            label="Organisation (optional)"
            placeholder="Enter your organisation name (if any)"
            variant="outlined"
            value={organisation}
            onChange={event => setOrganisation(event.target.value)}
          />

          <TextField
            required
            style={{ marginTop: "15px" }}
            fullWidth
            type="password"
            label="Password"
            placeholder="Create a password for your account"
            variant="outlined"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <LocationSearchInput setGeoData={setGeoData} />

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Link to="/auth">
              <Button color="primary" style={{ marginRight: "15px" }}>
                Login instead
              </Button>
            </Link>
            <Button variant="contained" color="primary">
              Register
            </Button>
          </div>

          {/* <p>{geoData.latitude}</p>
          <p>{geoData.longitude}</p>
          <p>{geoData.address}</p> */}
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
