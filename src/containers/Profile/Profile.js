import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";

import {
  Typography,
  Container,
  Chip,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  CardActionArea,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { LocalPhone, LocationOn } from "@material-ui/icons";
import Header from "../../components/Header/Header";

import classes from "./Profile.module.css";
import axios from "../../axios/axios";
import { useParams } from "react-router-dom";

function Profile() {
  const { profileState, profileActions } = useContext(ProfileContext);
  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  let { orgName } = useParams();

  useEffect(() => {
    console.log("orgname", orgName);
    if (orgName) {
      axios
        .get(`/profile/${orgName}`)
        .then(response => {
          console.log("response from pro", response);
          if (response.data.error === 0) {
            if (response.data.profile) {
              setErrorMessage("");
              setData(response.data.profile);
            }
          } else {
            setErrorMessage("Profile not found");
          }
        })
        .catch(error => {
          console.log(error);
          setErrorMessage("There was an error!");
        });
    }
  }, []);

  return (
    <div>
      <Header title="Profile" />
      <Container maxWidth="sm">
        {errorMessage && (
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <Alert variant="filled" severity="error">
              {errorMessage}
            </Alert>
          </div>
        )}
        {!errorMessage && (
          <>
            {" "}
            <div
              style={{
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">
                    {(data && data.group_name) ||
                      (profileState.profile && profileState.profile.group_name)}
                  </Typography>
                  <Typography variant="body1">
                    {(data && data.representative) ||
                      (profileState.profile &&
                        profileState.profile.representative)}
                  </Typography>
                  <Typography variant="body1">
                    <LocalPhone />
                    {(data && data.contact) ||
                      (profileState.profile && profileState.profile.contact)}
                  </Typography>
                  <Typography variant="body1">
                    <LocationOn />
                    {(data && data.locality && data.locality.place) ||
                      (profileState.profile &&
                        profileState.profile.locality &&
                        profileState.profile.locality.place)}
                  </Typography>

                  <div className={classes.tags_wrap}>
                    {(data &&
                      data.social_service.map((social_service, key) => {
                        return (
                          <span
                            key={`${social_service}`}
                            className={classes.tag}
                          >
                            {social_service}
                          </span>
                        );
                      })) ||
                      (profileState.profile &&
                        profileState.profile.social_service.map(
                          (social_service, key) => {
                            return (
                              <span
                                key={`${social_service}`}
                                className={classes.tag}
                              >
                                {social_service}
                              </span>
                            );
                          }
                        ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div
              style={{
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              {(data &&
                data.helps.map(help => {
                  return (
                    <div key={help._id} style={{ marginTop: "18px" }}>
                      <Card elevation={4}>
                        <CardMedia
                          style={{
                            height: "250px",
                          }}
                          image={help.photo}
                        />
                        <CardContent>
                          <Typography variant="h6">
                            {help.helpId && help.helpId.place}
                          </Typography>
                          {/* <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          >
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography> */}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })) ||
                (profileState.profile &&
                  profileState.profile.helps.map(help => {
                    return (
                      <div key={help._id} style={{ marginTop: "18px" }}>
                        <Card elevation={4}>
                          <CardMedia
                            style={{
                              height: "250px",
                            }}
                            image={help.photo}
                          />
                          <CardContent>
                            <Typography variant="h6">
                              {help.helpId && help.helpId.place}
                            </Typography>
                            {/* <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          >
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography> */}
                          </CardContent>
                        </Card>
                      </div>
                    );
                  }))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Profile;
