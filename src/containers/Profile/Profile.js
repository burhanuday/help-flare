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
            padding: "30px 30px",
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h4">
                {profileState.profile && profileState.profile.group_name}
              </Typography>
              <Typography variant="h5">
                {profileState.profile && profileState.profile.representative}
              </Typography>
              <Typography variant="h6">
                <LocalPhone />
                {profileState.profile && profileState.profile.contact}
              </Typography>
              <Typography variant="h6">
                <LocationOn />
                {profileState.profile && profileState.profile.locality.place}
              </Typography>

              <div className={classes.tags_wrap}>
                {profileState.profile &&
                  profileState.profile.social_service.map(
                    (social_service, key) => {
                      return (
                        <span className={classes.tag}>{social_service}</span>
                      );
                    }
                  )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
      <div
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          padding: "30px 30px",
        }}
      >
        {/* Maps Image url to Card Media */}
        {/*Prints caption on screen*/}
        <Grid container spacing={3}>
          {/* {profileState.profile && profileState.profile.helps.map((help,key) => {
        return(
          <Grid item xs={12} sm={4}>
            <Card>
            
              <CardMedia
                style={{ height: 0, paddingTop: "56.25%" }}
                image={help.imageUrl}
                title="Donation Images"
              />
              <Typography>{help.caption}</Typography> 
            </Card>
          </Grid>
        );
      })} */}
        </Grid>
      </div>
    </div>
  );
}

export default Profile;
