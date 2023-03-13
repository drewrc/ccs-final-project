import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../auth/auth-context/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cookies from "js-cookie";

function Login() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    login({ username, password });
  };

  if (isAuthenticated) {
    return <Navigate to="/user-feed" replace={true} />;
  }

  return (
    <>
      <div className="login-page">
        <Container id="login-container">
          <Row>
            <h3 id="login-header">Login below</h3>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <div className="login-text">
                  <Form.Group controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="password-box">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit">Login</Button>
                </div>
              </Form>
              <div className="help-links">
                <a id="help-links" href="#">
                  <h4>Create new account</h4>
                </a>
                <a id="help-links" href="#">
                  <h4>Forgot username?</h4>
                </a>
                <a id="help-links" href="#">
                  <h4>Forgot password?</h4>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Login;
