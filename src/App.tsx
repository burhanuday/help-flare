import React, { useContext, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./containers/Home/Home";
import Auth from "./containers/Auth/Auth";
import Report from "./containers/Report/Report";
import Help from "./containers/Help/Help";
import Profile from "./containers/Profile/Profile";
import VerifyHelp from "./containers/VerifyHelp/VerifyHelp";
import { ProfileContext } from "./contexts/ProfileContext";
import * as firebase from "firebase/app";
import { sendEvent, FIREBASE_APP_START } from "./util/analytics";
import AddToHomeScreen from "./components/AddToHomeScreen/AddToHomeScreen";
import { CircularProgress } from "@material-ui/core";

const Tutorial = lazy(() => import("./containers/Tutorial/Tutorial"));
const TermsAndConditions = lazy(() =>
  import("./containers/Legal/TermsAndConditions/TermsAndConditions")
);
const PrivacyPolicy = lazy(() =>
  import("./containers/Legal/PrivacyPolicy/PrivacyPolicy")
);

const firebaseConfig = {
  apiKey: "AIzaSyD0dlRIf-A_i6B_qFVS8-qzkt2sw2MERdY",
  authDomain: "portfolioprojects-58856.firebaseapp.com",
  databaseURL: "https://portfolioprojects-58856.firebaseio.com",
  projectId: "portfolioprojects-58856",
  storageBucket: "portfolioprojects-58856.appspot.com",
  messagingSenderId: "488368944319",
  appId: "1:488368944319:web:b6105dde5c7a1fd1bd020a",
  measurementId: "G-93YEVCHQ58",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App() {
  const loggedIn = localStorage.getItem("accessToken") ? true : false;
  const { profileState, profileActions } = useContext(ProfileContext);
  // let deferredPrompt;

  useEffect(() => {
    profileActions.fetchProfile();
    sendEvent(FIREBASE_APP_START);
  }, []);

  const hasPendingClaims = profileState?.profile?.claims?.length > 0;

  function noop() {}

  if (process.env.NODE_ENV !== "development") {
    console.log = noop;
    console.warn = noop;
    console.error = noop;
  }

  return (
    <>
      <AddToHomeScreen />
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="primary" size={24} />
            </div>
          }
        >
          <Switch>
            {!localStorage.getItem("firstTutorial") && (
              <Route path="/">
                <Tutorial />
              </Route>
            )}

            {!loggedIn && (
              <Route path="/auth">
                <Auth />
              </Route>
            )}
            {loggedIn && (
              <Route path="/profile">
                <Profile />
              </Route>
            )}
            {loggedIn && (
              <Route path="/help">
                <Help />
              </Route>
            )}
            {loggedIn && hasPendingClaims && (
              <Route path="/verify">
                <VerifyHelp />
              </Route>
            )}
            <Route path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route path="/terms-and-conditions">
              <TermsAndConditions />
            </Route>
            <Route path="/report">
              <Report />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
