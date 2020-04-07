import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
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
        {loggedIn && (
          <>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/profile"
            >
              <Button color="inherit">Profile</Button>
            </Link>
            <Button
              onClick={() => {
                const keys = localStorage.length;
                for (let i = 0; i < keys; i++) {
                  const key = localStorage.key(i);
                  if (
                    key &&
                    key !== "firstTutorial" &&
                    key !== "tutorialComplete"
                  ) {
                    localStorage.removeItem(key);
                  }
                }
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
