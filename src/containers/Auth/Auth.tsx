import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const Auth = (props: any) => {
  return (
    <>
      <Link to="/home">
        <IconButton>
          <ArrowBack style={{ color: "#2196F3" }} />
        </IconButton>
      </Link>
      <Switch>
        <Route exact path="/auth/register">
          <Register />
        </Route>
        <Route path="/auth">
          <Login />
        </Route>
      </Switch>
    </>
  );
};

export default Auth;
