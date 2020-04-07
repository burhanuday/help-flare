import React, { useContext, useEffect } from "react";
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
import Tutorial from "./containers/Tutorial/Tutorial";
import PrivacyPolicy from "./containers/Legal/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./containers/Legal/TermsAndConditions/TermsAndConditions";
import * as firebase from "firebase/app";
import { sendEvent, FIREBASE_APP_START } from "./util/analytics";
// import "./addtohomescreen";
// import "./addtohomescreen.css";

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

  useEffect(() => {
    profileActions.fetchProfile();
    sendEvent(FIREBASE_APP_START);

   /*  // @ts-ignore
    console.log(window.addToHomescreen);

    // @ts-ignore
    window.addToHomescreen({
      startDelay: 1,
      displayPace: 60,
    }); */
  }, []);

  const hasPendingClaims = profileState?.profile?.claims?.length > 0;

  function noop() {}

  if (process.env.NODE_ENV !== "development") {
    console.log = noop;
    console.warn = noop;
    console.error = noop;
  }

  return (
    <Router>
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
    </Router>
  );
}

export default App;
