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
              title="Report / रिपोर्ट करें"
              description="Report an area that needs help / क्षेत्र की रिपोर्ट करें, जिसे मदद की आवश्यकता है"
              to="/report"
            />

            {loggedIn && (
              <HomeItem
                title="Help / सहायता"
                description="Help an area by providing what they need / सामाजिक सेवा समूह आवश्यक सहायता दे सकते हैं"
                to="/help"
              />
            )}

            {loggedIn && hasPendingClaims && (
              <HomeItem
                title="Verify / प्रमाणन"
                description="View information and upload a picture for verification / जानकारी देखें और साबित करने के लिए एक तस्वीर अपलोड करें"
                to="/verify"
              />
            )}

            {!loggedIn && (
              <HomeItem
                title="Register / रजिस्टर करें"
                description="Register as a helper / सामाजिक सेवा समूह के रूप में रजिस्टर करें"
                to="/auth/register"
              />
            )}

            <HomeItem
              title="FAQ"
              description="About us and frequently asked questions / हमारे बारे में और अक्सर पूछे जाने वाले प्रश्न"
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
