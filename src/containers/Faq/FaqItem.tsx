import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const FaqItem = (props: any) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        margin: "8px 0px",
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t(props.question)}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {t(props.answer)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaqItem;
