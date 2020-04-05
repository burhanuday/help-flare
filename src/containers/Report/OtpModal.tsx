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
                if (response.data.error === 0) {
                  props.setSuccessMessage(
                    "Phone number verified. Report submitted successfully!"
                  );
                  props.setOtpModal(false);
                } else {
                  setOtpError("There was an error");
                }
              })
              .catch(error => {
                console.log(error);
                setOtpError("There was an error");
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
