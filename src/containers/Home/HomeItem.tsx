import React from "react";
import { Grid, Paper, Typography, CardActionArea } from "@material-ui/core";
import { Link } from "react-router-dom";

const HomeItem = (props: any) => {
  return (
    <Grid item xs={12} sm={6}>
      <Link style={{ textDecoration: "none", color: "white" }} to={props.to}>
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
              {props.title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {props.description}
            </Typography>
          </CardActionArea>
        </Paper>
      </Link>
    </Grid>
  );
};

export default HomeItem;
