import React, { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Container, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContext";
import HomeItem from "./HomeItem";
import Footer from "./Footer";
import Contact from "./Contact";

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Header />
        <Container maxWidth="sm">
          <Grid
            style={{
              marginTop: "30px",
              marginBottom: "20px",
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

            <HomeItem
              title="FAQ"
              description="About us and frequently asked questions"
              to="/faq"
            />
          </Grid>
        </Container>
      </div>
      <div>
        <Container maxWidth="sm">
          <Footer />
          <Contact />
        </Container>
      </div>
    </div>
  );
};

export default Home;
