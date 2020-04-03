import React from "react";
import { TextField, Typography } from "@material-ui/core";

export default (props: any) => {
  return (
    <div
      style={{
        margin: "15px 0px",
      }}
    >
      <TextField
        required={props.required}
        style={props.style}
        fullWidth={props.fullWidth}
        type={props.type || "text"}
        label={props.label}
        placeholder={props.placeholder}
        variant="outlined"
        multiline={props.multiline}
        disabled={props.disabled}
        size={props.size ? props.size : "medium"}
        name={props.name}
        onBlur={props.onBlur}
        value={props.value || ""}
        onChange={props.onChange}
      />
      <Typography variant="body2" color="error">
        {props.error && props.touched ? props.error : null}
      </Typography>
    </div>
  );
};
