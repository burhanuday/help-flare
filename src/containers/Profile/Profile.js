import React, { useContext, useEffect } from "react";
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
import { LocalPhone, LocationOn } from "@material-ui/icons";
import Header from "../../components/Header/Header";

import classes from "./Profile.module.css";

function Profile() {
  const { profileState, profileActions } = useContext(ProfileContext);
  console.log(profileState.profile);
  // if (profileState && profileState.profile) {

  //   // const typesOfService = profileState.profile.social_services.map(
  //   //         (social_service, key) => {
  //   //           return <span className={classes.tag}>{social_service}</span>;
  //   //         }
  //   //       );
  // }
  return (
    <div>
      <Header />
      <Container maxWidth="sm">
        <div
          style={{
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">
                {profileState.profile && profileState.profile.group_name}
              </Typography>
              <Typography variant="body1">
                {profileState.profile && profileState.profile.representative}
              </Typography>
              <Typography variant="body1">
                <LocalPhone />
                {profileState.profile && profileState.profile.contact}
              </Typography>
              <Typography variant="body1">
                <LocationOn />
                {profileState.profile && profileState.profile.locality.place}
              </Typography>

              <div className={classes.tags_wrap}>
                {profileState.profile &&
                  profileState.profile.social_service.map(
                    (social_service, key) => {
                      return (
                        <span key={`${social_service}`} className={classes.tag}>
                          {social_service}
                        </span>
                      );
                    }
                  )}
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
          {profileState.profile &&
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
                      <Typography variant="h6">{help.helpId.place}</Typography>
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
            })}
        </div>
      </Container>
    </div>
  );
}

export default Profile;
