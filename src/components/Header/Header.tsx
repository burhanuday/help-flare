import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { ArrowBack, Person } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import TranslateMenu from "./TranslateMenu";
// import { Menu } from "@material-ui/icons";

interface Props {
  showBackButton?: boolean;
  title?: string;
}

const Header: React.FC<Props> = props => {
  const APP_NAME = process.env.REACT_APP_NAME as string;
  const DEV = process.env.REACT_APP_DEVELOPER as string;
  const loggedIn = localStorage.getItem("accessToken") ? true : false;
  let location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        {location.pathname !== "/home" && (
          <Link to="/home">
            <IconButton>
              <ArrowBack style={{ color: "white" }} />
            </IconButton>
          </Link>
        )}
        <Link
          to="/home"
          style={{ flexGrow: 1, color: "white", textDecoration: "none" }}
        >
          <Typography variant="h6">{props.title || APP_NAME}</Typography>
        </Link>
        <TranslateMenu />
        {loggedIn && (
          <>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/profile"
            >
              <Button color="inherit">
                <Person />
              </Button>
            </Link>
            <Button
              onClick={() => {
                let keysToRemove = ["accessToken"];

                keysToRemove.forEach(k => localStorage.removeItem(k));
                window.location.reload();
              }}
              color="inherit"
            >
              Logout
            </Button>
          </>
        )}
        {!loggedIn && (
          <Link style={{ color: "white", textDecoration: "none" }} to="/auth">
            <Button color="inherit">Helper Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
