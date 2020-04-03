import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@material-ui/core";

export default (props: any) => {
  return (
    <div
      style={{
        margin: "15px 0px",
      }}
    >
      <FormControl variant="outlined" fullWidth={props.fullWidth}>
        <InputLabel>{props.label}</InputLabel>
        <Select
          multiple={props.multiple}
          required={props.required}
          style={props.style}
          fullWidth={props.fullWidth}
          type={props.type || "text"}
          label={props.label}
          placeholder={props.placeholder}
          multiline={props.multiline}
          disabled={props.disabled}
          name={props.name}
          onBlur={props.onBlur}
          value={props.value || ""}
          onChange={event => {
            props.onChange(props.name, event.target.value);
          }}
        >
          {props.options &&
            props.options.map((option: any, index: any) => (
              <MenuItem key={index} value={option.value}>
                {option.title || option.value}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Typography variant="body2" color="error">
        {props.error && props.touched ? props.error : null}
      </Typography>
    </div>
  );
};
