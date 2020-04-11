import React from "react";
import { TextField, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export default (props: any) => {
  const { t } = useTranslation();
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
        label={t(props.label)}
        placeholder={t(props.placeholder)}
        variant="outlined"
        multiline={props.multiline}
        disabled={props.disabled}
        size={props.size ? props.size : "medium"}
        name={props.name}
        onBlur={props.onBlur}
        value={props.value || ""}
        onChange={props.onChange}
        InputProps={{
          startAdornment: props.startAdornment,
        }}
      />
      <Typography variant="body2" color="error">
        {props.error && props.touched ? props.error : null}
      </Typography>
    </div>
  );
};
