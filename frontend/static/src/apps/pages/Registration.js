import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cookies from "js-cookie";
import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router";
import { AuthContext } from "../auth/auth-context/AuthContext";

function Registration() {
  const { isAuthenticated, register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("+1")
 
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    register({ username, password1, password2, email});
  };

  // const handlePhoneChange = (event) => {
  //   const value = event.target.value;
  //   if (value.startsWith("+1") || value === "") {
  //     setPhone(value);
  //   }
  // };

  if (isAuthenticated) {
    return <Navigate to="/friend-stories" replace={true} />;
  }

  return (
    <div
    style={{
      marginTop: '-5%',
      marginBottom: '-25%',
      padding: '7%',
      height: '100vh',
      width: '100vw',
    }}
    className="register-page"
  >
    <Container className="registration-container">
      <Row id="registration-container">
        <Col>
          <h3 id="registraiton-header">create new account</h3>
          <Form onSubmit={handleSubmit}>
            <div>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="email">
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Form.Group> */}

              <Form.Group className="mb-3" controlId="password1">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password1}
                  onChange={(event) => setPassword1(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password2">
                <Form.Label>Please enter password again:</Form.Label>
                <Form.Control
                  type="password"
                  value={password2}
                  onChange={(event) => setPassword2(event.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </div>
            <a id="help-links" href="#">
              <h4>Already have an account?</h4>
            </a>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Registration;
