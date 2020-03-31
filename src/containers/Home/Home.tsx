import React from "react";
import Header from "../../components/Header/Header";
import { Container, Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Home = (props: any) => {
  return (
    <div>
      <Header />
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            padding: "30px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Link to="/report" style={{ textDecoration: "none", color: "white" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "15px" }}
            >
              Report an area that needs help
            </Button>
          </Link>
          <Link to="/help" style={{ textDecoration: "none", color: "white" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "15px" }}
            >
              Help an area
            </Button>
          </Link>
          <Link
            to="/auth/register"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "15px" }}
            >
              Register as a helper
            </Button>
          </Link>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;
