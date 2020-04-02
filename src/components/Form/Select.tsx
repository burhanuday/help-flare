import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

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
      <ErrorMessage>
        {props.error && props.touched ? props.error : null}
      </ErrorMessage>
    </div>
  );
};
