import React, { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Container, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContext";
import HomeItem from "./HomeItem";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

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
            marginBottom: "12vh",
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

        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto auto",
            boxSizing: "border-box",
            width: "auto",
            textAlign: "center",
            fontSize: "0.9rem",
            paddingBottom: "5px",
            backgroundColor: "white",
            minHeight: "10vh",
          }}
        >
          <Container maxWidth="sm">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" style={{ marginRight: "10px" }}>
                Share:
              </Typography>
              <WhatsappShareButton
                title="Help Flare - Drop a flare for those in need"
                url="https://help-flare.web.app/"
              >
                <WhatsappIcon size={32} />
              </WhatsappShareButton>
              <FacebookShareButton
                url="https://help-flare.web.app/"
                quote="Help those affected by COVID-19. Visit Help Flare"
              >
                <FacebookIcon size={32} />
              </FacebookShareButton>
              <TwitterShareButton
                url="https://help-flare.web.app/"
                title="Help those affected by COVID-19. Visit Help Flare"
                // via="https://help-flare.web.app/"
              >
                <TwitterIcon size={32} />
              </TwitterShareButton>
              <LinkedinShareButton
                url="https://help-flare.web.app/"
                source="https://help-flare.web.app/"
                title="Help those affected by COVID-19. Visit Help Flare"
                summary="Help Flare is an app aimed at helping those who are affected by the virus"
              >
                <LinkedinIcon size={32} />
              </LinkedinShareButton>
              <RedditShareButton
                url="https://help-flare.web.app/"
                title="Help those affected by COVID-19. Visit Help Flare"
              >
                <RedditIcon size={32} />
              </RedditShareButton>
            </div>
          </Container>
          For updates and problems contact us at{" "}
          <a
            style={{
              fontSize: "1.0rem",
            }}
            href="https://www.instagram.com/codendeavour/"
            target="_blank"
            rel="noreferrer"
          >
            Code Endeavour
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Home;
