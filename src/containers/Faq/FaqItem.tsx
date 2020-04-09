import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const FaqItem = (props: any) => {
  return (
    <div
      style={{
        margin: "8px 0px",
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {props.question}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {props.answer}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaqItem;
