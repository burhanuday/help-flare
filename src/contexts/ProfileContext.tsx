import React, { useReducer } from "react";
import axios from "../axios/axios";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  profile: null,
};

export const PROFILE_START = "PROFILE_START";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILED = "PROFILE_FAILED";

const reducer = (state: any, action: any) => {
  console.log("action", action);
  switch (action.type) {
    case PROFILE_START:
      return {
        ...initialState,
        loading: true,
      };
    case PROFILE_SUCCESS:
      return {
        profile: action.payload,
        loading: false,
        error: false,
        errorMessage: "",
      };
    case PROFILE_FAILED:
      return {
        profile: null,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
  }
  return state;
};

const ProfileContext = React.createContext<any>(undefined);

const ProfileProvider = (props: any) => {
  const [profile, dispatch] = useReducer(reducer, initialState);

  const actions = {
    fetchProfile: () => {
      if (!localStorage.getItem("accessToken")) return;
      dispatch({ type: PROFILE_START });
      axios
        .get(`/profile`)
        .then(response => {
          console.log(response);
          if (response.data.error === 0) {
            dispatch({ type: PROFILE_SUCCESS, payload: response.data.helper });
          } else {
            dispatch({ type: PROFILE_FAILED, payload: response.data.message });
          }
        })
        .catch(error => {
          console.log(error);
          dispatch({
            type: PROFILE_FAILED,
            payload: "There was an error loading your profile",
          });
        });
    },
  };

  return (
    <ProfileContext.Provider
      value={{
        profileState: profile,
        profileActions: actions,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider, ProfileContext };
