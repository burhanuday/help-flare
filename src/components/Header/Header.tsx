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
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton> */}
        <Typography style={{ flexGrow: 1 }} variant="h6">
          Social Connect
        </Typography>
        <Link style={{ color: "white", textDecoration: "none" }} to="/auth">
          <Button color="inherit">NGO Login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
