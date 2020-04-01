import React from "react";
import { IconButton } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import classes from "./MapMarker.module.css";

const MapMarker = props => {
  return (
    <div className={classes.MapMarker}>
      <IconButton onClick={props.onClick}>
        <FiberManualRecord />
      </IconButton>
    </div>
  );
};

export default MapMarker;
