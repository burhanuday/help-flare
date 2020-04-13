import React, { useState } from "react";
import { Container, Button } from "@material-ui/core";
import Page from "./Page";
import { Pagination } from "@material-ui/lab";
import LanguageSelect from "./LanguageSelect";

const pages = [
  {
    title: "Add to home screen",
    description:
      "You can add the app to your home screen from the chrome menu for easy access",
    image: "https://i.imgur.com/HR1Wmnr.gif",
  },
  {
    title: "Report",
    description: "Report an area by selecting points on screen",
    image: "https://i.imgur.com/6Bs3cNc.png",
  },
  {
    title: "Help",
    description: "NGOs and social service groups can view the help required",
    image: "https://i.imgur.com/hquj5ai.jpg",
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
      "NGOs and groups upload a photo of the help provided for verification",
    image: "https://i.imgur.com/sa8Wk5a.jpg",
  },
];

const Tutorial = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  return (
    <div>
      <Container maxWidth="sm">
        <div
          style={{ height: "100vh", position: "relative", overflow: "hidden" }}
        >
          {currentPage === 0 && <LanguageSelect />}
          {pages.map((page, index) => (
            <Page
              key={page.title}
              currentPage={currentPage}
              pageNumber={index + 1}
              title={page.title}
              description={page.description}
              image={page.image}
            />
          ))}

          {/*   <div
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
            }}
          >
            <IconButton
              onClick={() => {
                if (currentPage < pages.length) {
                  setCurrentPage(currentPage + 1);
                } else {
                  localStorage.setItem("firstTutorial", "done");
                  window.location.reload();
                }
              }}
              style={{
                backgroundColor: "#f0f0f0",
              }}
            >
              <ChevronRight />
            </IconButton>
          </div>

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
            }}
          >
            <IconButton
              disabled={currentPage === 1}
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              style={{
                backgroundColor: "#f0f0f0",
              }}
            >
              <ChevronLeft />
            </IconButton>
          </div> */}

          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: 0,
              width: "100%",
              justifyContent: "space-between",
              height: "10vh",
              alignItems: "flex-start",
            }}
          >
            <Button
              disabled={currentPage === 0}
              onClick={() => {
                if (currentPage > 0) {
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
              page={currentPage + 1}
              count={pages.length + 1}
              variant="outlined"
              color="primary"
              onChange={(_, page) => {
                setCurrentPage(page - 1);
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
