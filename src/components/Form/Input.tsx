import React from "react";
import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { RHFInput } from "react-hook-form-input";

interface Props {
  setValue: any;
  register: any;
  label: string;
  name: string;
  placeholder: string;
  variant?: any;
  required?: boolean;
  fullWidth?: boolean;
  style?: any;
  type?: string;
  rules?: any;
  errors?: any;
  errorMessage?: string;
}

const ErrorMessage: React.FC = (props: any) => {
  return (
    <p
      style={{
        color: "red",
        fontSize: "12px"
      }}
    >
      {props.children}
    </p>
  );
};

const Input: React.FC<Props> = props => {
  return (
    <>
      <RHFInput
        as={
          <TextField
            required={props.required}
            style={props.style || { marginTop: "15px" }}
            fullWidth={props.fullWidth}
            type={props.type || "text"}
            label={props.label}
            placeholder={props.placeholder}
            variant={props.variant || "outlined"}
          />
        }
        rules={props.rules}
        name={props.name}
        register={props.register}
        setValue={props.setValue}
      />
      {props.errors[props.name] &&
        props.errors[props.name].type === "required" && (
          <ErrorMessage>This field is required</ErrorMessage>
        )}
      {props.errors[props.name] &&
        props.errors[props.name].type === "minLength" && (
          <ErrorMessage>
            Input is less than the required length
          </ErrorMessage>
        )}

      {props.errors[props.name] &&
        props.errors[props.name].type === "maxLength" && (
          <ErrorMessage>Input is more than the required length</ErrorMessage>
        )}
    </>
  );
};

export default Input;
