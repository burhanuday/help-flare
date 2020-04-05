import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const SnackbarAlert = (props: any) => {
  return (
    <Snackbar
      open={props.showZoomAlert}
      autoHideDuration={3000}
      onClose={(event: any, reason: string) => {
        if (reason === "clickaway") {
          return;
        }

        props.setShowZoomAlert(false);
      }}
    >
      <Alert
        onClose={event => props.setShowZoomAlert(false)}
        severity="error"
        variant="filled"
      >
        Zoom in more to draw a polygon
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
