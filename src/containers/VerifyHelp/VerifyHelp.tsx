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

const VerifyHelp: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { profileState, profileActions } = useContext(ProfileContext);
  console.log("profile state", profileState);

  return (
    <div>
      {console.log(profileState)}
      <Header />
      <Container maxWidth="sm">
        <div
          style={{
            padding: "20px 0px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Upload a picture of the help you provided
          </Typography>
          <Typography variant="body2">
            This picture will be displayed publicly on your profile. <br />
            This step is only for verification purposes. <br /> You will not be
            able to make any other claims if you do not do this step
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <Button variant="contained" component="label">
              Upload File
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
              const formData = new FormData();
              //   formData.append("photo", file);
              axios
                .post(
                  `/help/verify?helpId=${profileState.profile.claims[0]._id}`,
                  formData
                )
                .then(response => {
                  console.log(response);
                })
                .catch(error => {
                  console.log(error);
                });
            }}
            disabled={!file}
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
