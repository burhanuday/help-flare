import React from "react";
import { Container, Typography, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

const PrivacyPolicy = () => {
  const APP_NAME = process.env.REACT_APP_NAME as string;
  const DEV = process.env.REACT_APP_DEVELOPER as string;

  return (
    <div>
      <Link to="/auth/register">
        <IconButton>
          <ArrowBack style={{ color: "#2196F3" }} />
        </IconButton>
      </Link>
      <Container maxWidth="sm">
        <Typography variant="h3" gutterBottom>
          Privacy policy
        </Typography>
        <Typography variant="body2" gutterBottom>
          This privacy policy governs your use of {APP_NAME} for all devices
          that was created by Developer {DEV}. The application is a social
          service initiative to counter the side effects of COVID-19
        </Typography>
        <Typography variant="h5" gutterBottom>
          What information does the {APP_NAME} obtain and how is it used?
        </Typography>
        <Typography variant="h6" gutterBottom>
          User Provided Information
        </Typography>
        <Typography variant="body2" gutterBottom>
          The {APP_NAME} obtains the information you provide when you register
          with {APP_NAME}. Registration with us is optional. However, please
          keep in mind that you may not be able to use some of the features
          offered by the {APP_NAME} unless you register with us.
          <br />
          <br />
          When you register with us and use the {APP_NAME}, you generally
          provide (a) your name, phone number, password, vicinity and other
          registration information; (c) information you provide us when you
          contact us for help; (e) information you enter into our system when
          using the
          {APP_NAME}, such as contact information
        </Typography>
        {/* <Typography variant="h6" gutterBottom>
        Automatically Collected Information
      </Typography>
      <Typography variant="body2" gutterBottom>
        In addition, the {APP_NAME} may collect certain information
        automatically, including, but not limited to, the type of mobile device
        you use, your mobile devices unique device ID, the IP address of your
        mobile device, your mobile operating system, the type of mobile Internet
        browsers you use, and information about the way you use the {APP_NAME}.
      </Typography> */}
        <Typography variant="h5" gutterBottom>
          Does the {APP_NAME} collect precise real time location information of
          the device?
        </Typography>
        <Typography variant="body2" gutterBottom>
          When you visit the application, we use GPS technology to determine
          your current location in order to determine where you are located
          within and display a location map. We will not share your current
          location with other users or partners.
          <br />
          <br />
          If you do not want us to use your location for the purposes set forth
          above, you should turn off the location services for the application
          located in your account settings or in your mobile phone settings
          and/or within the mobile application.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Do third parties see and/or have access to information obtained by the
          {APP_NAME}?
        </Typography>
        <Typography variant="body2" gutterBottom>
          Yes. We will share your information with third parties only in the
          ways that are described in this privacy statement. <br />
          We may disclose User Provided and Automatically Collected Information:
          as required by law, such as to comply with a subpoena, or similar
          legal process; when we believe in good faith that disclosure is
          necessary to protect our rights, protect your safety or the safety of
          others, investigate fraud, or respond to a government request;
        </Typography>
        <Typography variant="h5" gutterBottom>
          What are my opt-out rights?
        </Typography>
        <Typography variant="body2" gutterBottom>
          You can stop all collection of information by the {APP_NAME} easily by
          uninstalling the {APP_NAME}. You may use the standard uninstall
          processes as may be available as part of your mobile device or via the
          mobile application marketplace or network.
        </Typography>
        {/* <Typography variant="h5" gutterBottom>
        Data Retention Policy, Managing Your Information
      </Typography>
      <Typography variant="body2" gutterBottom>
        We will retain User Provided data for as long as you use the {APP_NAME}
        and for a reasonable time thereafter. We will retain Automatically
        Collected information for up to 24 months and thereafter may store it in
        aggregate. If you’d like us to delete User Provided Data that you have
        provided via the {APP_NAME}, please contact us at
        privacy@applicationsite.com and we will respond in a reasonable time.
        Please note that some or all of the User Provided Data may be required
        in order for the {APP_NAME} to function properly.
      </Typography> */}
        <Typography variant="h5" gutterBottom>
          Your Consent
        </Typography>
        <Typography variant="body2" gutterBottom>
          By using the {APP_NAME}, you are consenting to our processing of your
          information as set forth in this Privacy Policy now and as amended by
          us. "Processing,” means using cookies on a computer/hand held device
          or using or touching information in any way, including, but not
          limited to, collecting, storing, deleting, using, combining and
          disclosing information, all of which activities will take place in
          India. If you reside outside India your information will be
          transferred, processed and stored there under Indian privacy
          standards.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Changes
        </Typography>
        <Typography variant="body2" gutterBottom>
          This Privacy Policy may be updated from time to time for any reason.
          You are advised to consult this Privacy Policy regularly for any
          changes, as continued use is deemed approval of all changes.
        </Typography>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
