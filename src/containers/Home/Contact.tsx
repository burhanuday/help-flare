import React from "react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "6px",
        fontSize: "0.85rem",
      }}
    >
      {t("For updates and problems contact us at")}
      <a
        style={{
          paddingLeft: "5px",
          fontSize: "1.0rem",
        }}
        href="https://www.instagram.com/codendeavour/"
        target="_blank"
        rel="noreferrer"
      >
        Code Endeavour
      </a>
    </div>
  );
};

export default Contact;
