import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Auth from "./containers/Auth/Auth";
import Report from "./containers/Report/Report";
import Help from "./containers/Help/Help";
import Profile from "./containers/Profile/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/help">
          <Help />
        </Route>
        <Route path="/report">
          <Report />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
