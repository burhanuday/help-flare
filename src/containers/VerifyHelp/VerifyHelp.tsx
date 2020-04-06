import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header/Header";
import axios from "../../axios/axios";
import {
  Input,
  Button,
  Container,
  TextField,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { ProfileContext } from "../../contexts/ProfileContext";
import { Alert } from "@material-ui/lab";
import { StaticGoogleMap, Marker, Path } from "react-static-google-map";

const VerifyHelp: React.FC = () => {
  const [file, setFile] = useState<File>();
  const { profileState, profileActions } = useContext(ProfileContext);
  const [error, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const latestClaim = profileState?.profile?.claims[0];

  return (
    <div>
      {console.log(profileState)}
      <Header title="Verify" />
      <Container maxWidth="sm">
        <div
          style={{
            padding: "20px 0px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Upload a picture of the help you provided
          </Typography>
          <Typography variant="body2" gutterBottom>
            This picture will be displayed publicly on your profile. <br />
            This step is for verification purposes. <br /> You will not be able
            to make any other claims if you do not do this step
          </Typography>
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

          <Typography variant="body1">Place: {latestClaim.place} </Typography>
          <Typography variant="body1">
            Reported by: {latestClaim.reported_by}
          </Typography>
          <Typography variant="body1">Contact: {latestClaim.phone} </Typography>

          <StaticGoogleMap
            // center={`${latestClaim.area.coordinates[0][0][0]},${latestClaim.area.coordinates[0][0][1]}`}
            zoom="17"
            size="400x400"
            apiKey={process.env.REACT_APP_MAP_KEY as string}
          >
            <Path
              color="0x00ff00ff"
              weight="5"
              points={latestClaim.area.coordinates[0].map(
                (coordinate: any) => ({
                  lat: coordinate[0],
                  lng: coordinate[1],
                })
              )}
            />
          </StaticGoogleMap>
          <Typography style={{ marginTop: "20px" }} variant="h6" gutterBottom>
            Verify:
          </Typography>
          <br />
          <Typography variant="body1">Select image: </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Button disabled={loading} variant="contained" component="label">
              Select image
              <input
                accept="image/*"
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files && event.target.files[0]) {
                    const file = event.target.files[0];
                    console.log(file);
                    setFile(file);
                  }
                }}
                style={{ display: "none" }}
              />
            </Button>
            <InputLabel
              style={{
                marginLeft: "10px",
              }}
            >
              {file && file.name}
            </InputLabel>
          </div>
          <Button
            onClick={() => {
              setLoading(true);
              const formData = new FormData();
              // @ts-ignore
              formData.append("photo", file, file?.name || "file");
              axios
                .post(
                  `/help/verify?helpId=${profileState.profile.claims[0]._id}`,
                  formData
                )
                .then(response => {
                  console.log(response);
                  if (response.data.error === 0) {
                    setSuccessMessage(response.data.message);
                    setErrorMessage("");
                    setFile(undefined);
                    setTimeout(() => {
                      profileActions.fetchProfile();
                    }, 2000);
                  } else {
                    setSuccessMessage("");
                    setErrorMessage(response.data.message);
                  }
                })
                .catch(error => {
                  console.log(error);
                  setSuccessMessage("");
                  setErrorMessage("There was an error!");
                })
                .finally(() => setLoading(false));
            }}
            disabled={!file || loading}
            variant="contained"
            color="primary"
          >
            Submit photo
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default VerifyHelp;
