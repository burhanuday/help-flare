import React, { useState, useEffect } from "react";
import { Slide, Paper, Typography, Button } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useTranslation } from "react-i18next";

const Page = (props: any) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")) {
      setSelectedLanguage(localStorage.getItem("i18nextLng") as string);
    } else {
      localStorage.setItem("i18nextLng", "en");
    }
  }, []);

  return (
    <Slide
      direction="left"
      exit={false}
      in={props.pageNumber === props.currentPage}
      mountOnEnter
      unmountOnExit
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "90vh",
        }}
      >
        <div
          style={{
            height: "50vh",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography align="center" variant="h5" gutterBottom>
            Select Language
          </Typography>
        </div>
        <div
          style={{
            padding: "10px 40px",
            marginBottom: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              setSelectedLanguage("en");
              localStorage.setItem("i18nextLng", "en");
              i18n.changeLanguage("en");
            }}
            style={buttonStyle}
            color="primary"
            variant={selectedLanguage === "en" ? "contained" : "outlined"}
          >
            English
          </Button>
          <Button
            onClick={() => {
              setSelectedLanguage("hi");
              localStorage.setItem("i18nextLng", "hi");
              i18n.changeLanguage("hi");
            }}
            style={buttonStyle}
            color="primary"
            variant={selectedLanguage === "hi" ? "contained" : "outlined"}
          >
            हिंदी
          </Button>
        </div>
      </div>
    </Slide>
  );
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 15px",
  width: "200px",
};

export default Page;
