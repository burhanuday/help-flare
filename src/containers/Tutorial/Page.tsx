import React from "react";
import { Slide, Paper, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useTranslation } from "react-i18next";

const Page = (props: any) => {
  const { t } = useTranslation();
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
        <img
          style={{
            height: "50vh",
            objectFit: "cover",
            boxSizing: "border-box",
          }}
          alt="img-tutorial"
          src={props.image}
        />
        <div
          style={{
            padding: "10px 40px",
            marginBottom: "40px",
          }}
        >
          <Typography align="center" variant="h5" gutterBottom>
            {t(props.title)}
          </Typography>
          <Typography align="center" variant="body1">
            {t(props.description)}
          </Typography>
        </div>
      </div>
    </Slide>
  );
};

export default Page;
