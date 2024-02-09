import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, Alert, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const emailValidation = (email) => {
    const emailRegex = /^[a-zA-Z0-9_]+@[a-zA-Z]{2,8}\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!emailValidation(newEmail)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!validatePassword(newPassword)) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const onSubmitFunc = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {
      const currentUsers =
        JSON.parse(localStorage.getItem("currentUser")) || [];
      currentUsers.push(foundUser.name);
      localStorage.setItem("currentUser", JSON.stringify(currentUsers));

    } else {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      <Row className="justify-content-md-left mt-2">
        <Col md={4} xs={12} xl={3}>
          <Image src="https://en.idei.club/uploads/posts/2023-02/1675338858_en-idei-club-p-interior-background-blurred-vkontakte-48.jpg"
            style={{ width: "85rem" }}
          />
        </Col>
        <Col md={4}>
          {alertVisible && (
            <Alert
              variant="danger"
              onClose={() => setAlertVisible(false)}
              dismissible
            >
              Invalid Information. If you don't have an account, please sign up
              first.
            </Alert>
          )}
          <Form onSubmit={onSubmitFunc}>
            <Form.Group>
              <Form.Label className="text-primary mt-3">Email:</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={handleEmailChange}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label className="text-primary mt-3">Password:</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
              <Button
                variant="info"
                className="mt-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                />
              </Button>
            </Form.Group>

            <Button
              className="my-3"
              variant="primary"
              type="submit"
              disabled={!!emailError || !!passwordError}
            >
              Login
            </Button>
            <div className="text-dark">
              Don't have an account? <Link style={{ textDecoration: "none" }} to="/signup"><b>Sign Up</b></Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
