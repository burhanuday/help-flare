import React from "react";
import { TextField } from "@material-ui/core";
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
  errorMessages?: any;
  multiline?: boolean;
}

const ErrorMessage: React.FC = (props: any) => {
  return (
    <p
      style={{
        color: "red",
        fontSize: "12px",
        margin: 0,
        padding: 0
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
            multiline={props.multiline}
          />
        }
        rules={props.rules}
        name={props.name}
        register={props.register}
        setValue={props.setValue}
      />
      {/* {console.log(props.errors[props.name])} */}
      {props.errors[props.name] &&
        props.errors[props.name].type === "required" &&
        props.errorMessages[props.errors[props.name].type] && (
          <ErrorMessage>
            {props.errorMessages[props.errors[props.name].type]}
          </ErrorMessage>
        )
      /*  : (
        <ErrorMessage>This field is required</ErrorMessage>
      ) */
      }

      {props.errors[props.name] &&
        props.errors[props.name].type === "minLength" &&
        props.errorMessages[props.errors[props.name].type] && (
          <ErrorMessage>
            {props.errorMessages[props.errors[props.name].type]}
          </ErrorMessage>
        )}

      {props.errors[props.name] &&
        props.errors[props.name].type === "maxLength" &&
        props.errorMessages[props.errors[props.name].type] && (
          <ErrorMessage>
            {props.errorMessages[props.errors[props.name].type]}
          </ErrorMessage>
        )}
    </>
  );
};

export default Input;
