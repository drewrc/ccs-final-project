import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cookies from "js-cookie";
import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router";
import { AuthContext } from "../auth/auth-context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function Registration() {
  const { isAuthenticated, register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  // const [phone, setPhone] = useState("+1")
 
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors
    setErrors({});

    // Check if all required fields are filled
    if (!username) {
      setErrors((prevState) => ({ ...prevState, username: 'Username is required' }));
    }
    if (!email) {
      setErrors((prevState) => ({ ...prevState, email: 'Email is required' }));
    }
    if (!password1) {
      setErrors((prevState) => ({ ...prevState, password1: 'Password is required' }));
    }
    if (!password2) {
      setErrors((prevState) => ({ ...prevState, password2: 'Please enter the password again' }));
    }

    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && !emailRegex.test(email)) {
      setErrors((prevState) => ({ ...prevState, email: 'Please enter a valid email address' }));
    }

    // Check if password meets minimum requirements
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (password1 && !passwordRegex.test(password1)) {
    setErrors((prevState) => ({ ...prevState, password1: 'Password must contain at least one letter and one number' }));
    }

    // Check if passwords match
    if (password1 && password2 && password1 !== password2) {
      setErrors((prevState) => ({ ...prevState, password2: 'Passwords do not match' }));
    }

    // Submit the form if all validations pass
    if (Object.keys(errors).length === 0) {
      try {
        await register({ username, password1, password2, email });
        // handle successful registration
      } catch (error) {
        // handle registration error
      }
    }
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
      <Row
      style={{paddingBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginBottom: '10%',
    }}
      id="registration-container">
        <Col 
       >
          <h3 
            style={{
              paddingTop: '10%',
              paddingBottom: '5%',
            }}
          id="registraiton-header">create new account</h3>
          <Form 
          
          onSubmit={handleSubmit}>
            <div>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label
                 style={{
                  fontSize: '20px',
                  textShadow: '1px 1px 1px black',
                }}
                >Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              {errors.username && <div className="error"><FontAwesomeIcon icon={faTriangleExclamation} /> {errors.username}</div>}
       
              <Form.Group className="mb-3" controlId="email">
                <Form.Label
                 style={{
                  fontSize: '20px',
                  textShadow: '1px 1px 1px black',
                }}
                >Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                 {errors.email && <div className="error"><FontAwesomeIcon icon={faTriangleExclamation} /> {errors.email}</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="password1">
                <Form.Label
                 style={{
                  fontSize: '20px',
                  textShadow: '1px 1px 1px black',
                }}
                >Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password1}
                  onChange={(event) => setPassword1(event.target.value)}
                />
              </Form.Group>
              {errors.password1 && <div className="error"><FontAwesomeIcon icon={faTriangleExclamation} /> {errors.password1}</div>}
              <Form.Group className="mb-3" controlId="password2">
                <Form.Label
                 style={{
                  fontSize: '20px',
                  textShadow: '1px 1px 1px black',
                }}
                >Please enter password again:</Form.Label>
                <Form.Control
                  type="password"
                  value={password2}
                  onChange={(event) => setPassword2(event.target.value)}
                />
              </Form.Group>
              {errors.password1 && <div className="error"><FontAwesomeIcon icon={faTriangleExclamation} /> {errors.password1}</div>}
              <button
                id="register-button"
                  style={{
                    marginTop: '10px',
                    marginBottom: '10%',
                    color: '#ffffff', 
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    transition: 'background-color 0.3s ease', 
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
                    backgroundColor: '#e63946'
                  }}
                  type="submit">Register</button>
            </div>
            <a 
            id="help-links" href="#">
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
