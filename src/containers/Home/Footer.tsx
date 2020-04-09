import React from "react";
import { Typography } from "@material-ui/core";
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

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px 20px",
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
  );
};

export default Footer;
