import React from "react";
import { Container, Typography, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

const TermsAndConditions = () => {
  const APP_NAME = process.env.REACT_APP_NAME as string;
  const DEV = process.env.REACT_APP_DEVELOPER as string;

  return (
    <div>
      <Link to="/auth/register">
        <IconButton>
          <ArrowBack style={{ color: "blue" }} />
        </IconButton>
      </Link>
      <Container maxWidth="sm">
        <Typography variant="h3" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="body2" gutterBottom>
          Please read these "Terms of Service" fully and carefully before using{" "}
          {APP_NAME} and any of the services, features, Content or the
          application made available by {DEV}.
          <br />
          <br />
          These Terms of Service set forth the legally binding terms and
          conditions for your use of the Services.
          <br />
          <br />
          By clicking on the “Register” or equivalent access, agreement you or
          the company or entity that you represent ("you," "your," "yours" or
          "customer") are consenting to be bound by and are becoming a party to
          these Terms of Service. You are also representing and warranting that
          the individual clicking on the button is authorized to enter into this
          agreement and bind such entity. Your continued use of any portion of
          the services shall also constitute assent to the terms of these Terms
          of Service. If you are using the services on behalf of a company or
          other entity, then all references to "you" or "your" herein shall
          refer to both the individual and the entity. If you do not
          unconditionally agree to all of the terms of these Terms of Service,
          you will have no right to use the Services (and you should immediately
          cease all such use).
          <br />
          <br />
          By registering for and/or using any of the Services in any manner,
          including visiting or browsing the {APP_NAME} Website, you agree to
          these Terms of Service, and all other operating rules, policies, and
          procedures that we may publish from time to time through the Services,
          each of which is incorporated by reference, and each of which may be
          updated from time to time without notice to you.
          <br />
          <br />
          Eligibility. You represent and warrant that you are at least 13 years
          of age. If you are under age 13, you may not, under any circumstances
          or for any reason, register for an Account or use the Services.
          <br />
          <br />
          You are solely responsible for any report you make, or press the help
          button. {APP_NAME} and {DEV} take no responsibility for the unintended
          effects of {APP_NAME} whatsoever
        </Typography>
      </Container>
    </div>
  );
};

export default TermsAndConditions;
