import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
// import { Menu } from "@material-ui/icons";

const Header: React.FC = props => {
  const loggedIn = localStorage.getItem("accessToken") ? true : false;

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton> */}
        <Typography style={{ flexGrow: 1 }} variant="h6">
          Social Connect
        </Typography>
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
                localStorage.clear();
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
