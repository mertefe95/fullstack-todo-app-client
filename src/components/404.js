import React from "react";
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom";

function pageNotFound() {
  return (
    <div className="notfound-div">
    <Alert className="notfound-alert" variant="warning">
    <div className="notfound-inner-div">
        <Alert.Heading style={{ fontWeight: "bold"}}>404 PAGE NOT FOUND</Alert.Heading>
        <p>
          The page you looking for is not found. <br/>
          You may go to Homepage by clicking the button below,
            or
          <br/>
          <span style={{textDecoration: "underline", fontWeight: "bold", fontSize: "25px"}}>If you're trying to view your own todos you have to be logged in.</span><br/>
        </p>
        <hr />
        <div className="d-flex justify-content-center notfound-button-div">
        <Link to="/">
          <Button className="notfound-button notfound-home-btn" variant="outline-warning">
            Go to Homepage
          </Button>
          </Link>
          <Link to="/login">
          <Button className="notfound-button notfound-login-btn" variant="outline-warning">
            Go to Login
          </Button>
          </Link>
        </div>
        </div>
      </Alert>
      </div>
  )

}


export default pageNotFound;