import React from "react";
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

function App() {
  const loggedIn = localStorage.getItem("accessToken") ? true : false;

  return (
    <Router>
      <Switch>
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
