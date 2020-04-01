import React, { useReducer } from "react";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
};

const reducer = (state: any, action: any) => {
  console.log("action", action);
  switch (action.type) {
    case "AUTH_LOADING":
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };
  }
  return state;
};

const AuthContext = React.createContext<any>(undefined);

const Auth = (props: any) => {
  const [auth, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        authState: auth,
        authDispatch: dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { Auth, AuthContext };
