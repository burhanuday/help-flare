import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

const Auth = (props: any) => {
  return (
    <Switch>
      <Route exact path="/auth/register">
        <Register />
      </Route>
      <Route path="/auth">
        <Login />
      </Route>
    </Switch>
  );
};

export default Auth;
