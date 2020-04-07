import React, { useState } from "react";
import { Container, Button } from "@material-ui/core";
import Page from "./Page";
import { Pagination } from "@material-ui/lab";
import help from "../../assets/help.jpg";
import upload from "../../assets/upload.jpg";
import marker2 from "../../assets/marker2.png";
import hs from "../../assets/hs.png";
import sw2 from "../../assets/sw2.jpeg";

const pages = [
  {
    title: "Add to home screen",
    description:
      "You can add the app to your home screen from the chrome menu. Get alerts about your reports and other important information",
    image: sw2,
  },
  {
    title: "Report",
    description:
      "Report an area by selecting points on screen and mention the help needed",
    image: marker2,
  },
  {
    title: "Help",
    description:
      "NGOs and social service groups can view the help required by registering and then going to the help section",
    image: help,
  },
  /*  {
    title: "View Help",
    description:
      "Press the marked area to claim an area and provide the help requested",
    image: help,
  }, */
  {
    title: "Upload a photo",
    description:
      "NGOs and groups upload a photo of the help provided for verification purposes",
    image: upload,
  },
];

const Tutorial = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div>
      <Container maxWidth="sm">
        <div
          style={{ height: "100vh", position: "relative", overflow: "hidden" }}
        >
          {pages.map((page, index) => (
            <Page
              currentPage={currentPage}
              pageNumber={index + 1}
              title={page.title}
              description={page.description}
              image={page.image}
            />
          ))}

          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: 0,
              width: "100%",
              justifyContent: "space-between",
              height: "10vh",
              alignItems: "center",
            }}
          >
            <Button
              disabled={currentPage === 1}
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              variant="text"
            >
              Prev
            </Button>
            <Pagination
              hideNextButton
              hidePrevButton
              page={currentPage}
              count={pages.length}
              variant="outlined"
              color="primary"
              onChange={(_, page) => {
                setCurrentPage(page);
              }}
            />
            <Button
              onClick={() => {
                if (currentPage < pages.length) {
                  setCurrentPage(currentPage + 1);
                } else {
                  localStorage.setItem("firstTutorial", "done");
                  window.location.reload();
                }
              }}
              variant="text"
            >
              {currentPage === pages.length ? "Done" : "Next"}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Tutorial;
