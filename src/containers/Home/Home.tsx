import React, { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Container, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContext";
import HomeItem from "./HomeItem";

const Home = (props: any) => {
  const loggedIn = localStorage.getItem("accessToken") ? true : false;
  const { profileState, profileActions } = useContext(ProfileContext);
  const hasPendingClaims = profileState?.profile?.claims?.length > 0;

  /* useEffect(() => {
    let prompt = localStorage.getItem("a2hs");
    if (prompt) {
      prompt = JSON.parse(prompt);
      // @ts-ignore
      prompt.prompt();
    }
  }, []); */

  return (
    <div>
      <Header />
      <Container maxWidth="sm">
        <Grid
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            padding: "0px 10px",
          }}
          container
          spacing={3}
        >
          <HomeItem
            title="Report"
            description="Report an area that needs help"
            to="/report"
          />

          {loggedIn && (
            <HomeItem
              title="Help"
              description="Help an area by providing what they need"
              to="/help"
            />
          )}

          {loggedIn && hasPendingClaims && (
            <HomeItem
              title="Verify"
              description="View information and upload a picture for verification"
              to="/verify"
            />
          )}

          {!loggedIn && (
            <HomeItem
              title="Register"
              description="Register as a helper"
              to="/auth/register"
            />
          )}
        </Grid>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto auto",
            boxSizing: "border-box",
            width: "auto",
            textAlign: "center",
            fontSize: "0.9rem",
            marginBottom: "10px",
          }}
        >
          For updates and problems contact us at{" "}
          <a
            style={{
              fontSize: "1.0rem",
            }}
            href="https://www.instagram.com/codendeavour/"
          >
            Codendeavour
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Home;
