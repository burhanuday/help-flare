import React, { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Container, Button, Grid, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContext";
import HomeItem from "./HomeItem";
import Footer from "./Footer";
import Contact from "./Contact";
import ViewTutorialCard from "./ViewTutorialCard";

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

  //Translation function
  const { t } = useTranslation();

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
              title={t("Report")}
              description={t("Report an area that needs help")}
              to="/report"
            />

            {loggedIn && (
              <HomeItem
                title={t("Help")}
                description={t("Register as helper")}
                to="/help"
              />
            )}

            {loggedIn && hasPendingClaims && (
              <HomeItem
                title={t("Verify")}
                description={t("Upload a picture of the help you provided")}
                to="/verify"
              />
            )}

            {!loggedIn && (
              <HomeItem
                title={t("Register")}
                description={t("Register as a helper")}
                to="/auth/register"
              />
            )}

            <HomeItem
              title={t("FAQ")}
              description={t("About us and frequently asked questions")}
              to="/faq"
            />

            <ViewTutorialCard />
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
