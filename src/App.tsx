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

function App() {
  const loggedIn = localStorage.getItem("accessToken") ? true : false;
  const { profileState, profileActions } = useContext(ProfileContext);

  useEffect(() => {
    profileActions.fetchProfile();
  }, []);

  const hasPendingClaims = profileState?.profile?.claims?.length > 0;

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
