import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import axios from "../../axios/axios";
import { Alert } from "@material-ui/lab";
import {
  FIREBASE_USER_REGISTERED,
  sendEvent,
  FIREBASE_AUTH_ERROR,
} from "../../util/analytics";

const OtpModal = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<any>("");
  const [otpError, setOtpError] = useState<string>("");

  return (
    <Dialog
      style={{
        zIndex: 9000,
      }}
      open={props.visible}
    >
      <DialogTitle>Phone number verification</DialogTitle>
      <DialogContent>
        {otpError && (
          <Alert variant="filled" severity="error">
            {otpError}
          </Alert>
        )}
        <DialogContentText>
          Enter the 6 digit OTP sent to your phone
        </DialogContentText>
        <TextField
          type="number"
          autoFocus
          placeholder="Enter the 6 digit OTP"
          variant="outlined"
          value={otp}
          disabled={loading}
          fullWidth
          onChange={(event: any) => {
            setOtp(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          onClick={() => {
            if (otp.length !== 6) {
              setOtpError("OTP length should be 6 digits");
              return;
            }
            setLoading(true);
            const formData = new FormData();
            console.log(otp);
            formData.append("otp", otp);
            axios
              .post(`/helper/verify`, formData)
              .then(response => {
                console.log("response", response);
                sendEvent(FIREBASE_USER_REGISTERED);
                props.setSuccessMessage(
                  "OTP verified. You have been registered successfully!"
                );
                props.setOtpModal(false);
              })
              .catch(error => {
                console.log(error);
                setOtpError("There was an error");
                sendEvent(FIREBASE_AUTH_ERROR, error);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          color="primary"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OtpModal;
