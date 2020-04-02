import React from "react";
import { TextField } from "@material-ui/core";

const ErrorMessage: React.FC = (props: any) => {
  return (
    <p
      style={{
        color: "red",
        fontSize: "12px",
        margin: 0,
        padding: 0,
      }}
    >
      {props.children}
    </p>
  );
};

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
      <ErrorMessage>
        {props.error && props.touched ? props.error : null}
      </ErrorMessage>
    </div>
  );
};
