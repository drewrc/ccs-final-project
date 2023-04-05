import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../auth/auth-context/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cookies from "js-cookie";
// import '../views/workingoutwoman2.png' 
import React from "react";
import backgroundImage from '../views/workingoutwoman2.png';
import { Link } from "react-router-dom";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.backgroundImage = `url("workingoutwoman2.png")`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, []);

  const { isAuthenticated, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Reset errors
    setErrors({});
  
    // Check if all required fields are filled
    if (!username) {
      setErrors((prevState) => ({ ...prevState, username: 'Username is required' }));
    }
    if (!password) {
      setErrors((prevState) => ({ ...prevState, password: 'Password is required' }));
    }
  
    // Submit the form if all validations pass
    if (Object.keys(errors).length === 0) {
      try {
        await login({ username, password });
        // handle successful login
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrors((prevState) => ({ ...prevState, general: 'Invalid username or password' }));
        } else {
          setErrors((prevState) => ({ ...prevState, general: 'Something went wrong. Please try again later.' }));
        }
      }
    }
  };
  

  if (isAuthenticated) {
    return <Navigate to="/friend-stories" replace={true} />;
  }

  return (
    <>
      <div
      style={{
        marginTop: '-5%',
        padding: '7%',
        height: '100vh',
        width: '100vw',
      }}
      className="login-page"
    >

        <Container id="login-container">
          <Row>
            <h3 
            style={{
              paddingTop: '10%',
              paddingBottom: '5%',
            }}
            id="login-header">Login below</h3>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <div 
                
                className="login-text">
                  <Form.Group 
                  style={{
                    paddingBottom: '5%',
                  }}
                  controlId="username">
                    <Form.Label
                      style={{
                        fontSize: '30px',
                        textShadow: '1px 1px 1px black',
                      }}
                    >Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                    {errors.username && <div className="error"><FontAwesomeIcon icon={faTriangleExclamation} />  {errors.username}</div>}
                  </Form.Group>
                  <Form.Group controlId="password" className="password-box">
                    <Form.Label
                       style={{
                        fontSize: '30px',
                        textShadow: '1px 1px 1px black',
                      }}
                    >Password:</Form.Label>

                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                       {errors.password && <div className="error"><FontAwesomeIcon icon={faTriangleExclamation} />  {errors.password}</div>}
                       {errors.general && <div className="error"><FontAwesomeIcon icon={faTriangleExclamation} />  {errors.general}</div>}
                  </Form.Group>
               
                <p>
                <button
                  id="register-button"
                  style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    color: '#ffffff', 
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    transition: 'background-color 0.3s ease', 
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
                    backgroundColor: '#e63946',
                    textShadow: '1px 1px 1px black',
                  }}
                  type="submit">Login</button>
                    </p>
                </div>
              </Form>
              <div 
              style={{ 
                paddingLeft: '5%',
              }}
              className="help-links">
                <Link 
                id="help-link"
                to="/register">
                  <h4
                  style={{
                    textShadow: '1px 1px 1px black',
                  }}
                  >Create new account</h4>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Login;
