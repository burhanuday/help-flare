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
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Faq from "./containers/Faq/Faq";

const Tutorial = lazy(() => import("./containers/Tutorial/Tutorial"));
const TermsAndConditions = lazy(() =>
  import("./containers/Legal/TermsAndConditions/TermsAndConditions")
);
const PrivacyPolicy = lazy(() =>
  import("./containers/Legal/PrivacyPolicy/PrivacyPolicy")
);

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#2196F3",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#BBDEFB",
      main: "#1976D2",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

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
    <ThemeProvider theme={theme}>
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

            <Route path="/faq">
              <Faq />
            </Route>

            <Route path="/profile/:orgName">
              <Profile />
            </Route>

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
    </ThemeProvider>
  );
}

export default App;
