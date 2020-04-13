import React from "react";
import {
  Grid,
  Paper,
  Typography,
  CardActionArea,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ArrowForward } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

const ViewTutorialCard = (props: any) => {
  const { t } = useTranslation();

  return (
    <Grid item xs={12} sm={6}>
      <a
        style={{ textDecoration: "none", color: "white" }}
        href="https://youtu.be/EY4HCGZaF6I"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Paper
          style={{
            minHeight: "100px",
          }}
          variant="outlined"
          elevation={2}
        >
          <CardActionArea
            style={{
              padding: "8px 16px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {t("View Tutorial")}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {t("Watch a short video on how to use Help Flare")}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "15px",
              }}
            >
              <ArrowForward color="primary" />
            </div>
          </CardActionArea>
        </Paper>
      </a>
    </Grid>
  );
};

export default ViewTutorialCard;
