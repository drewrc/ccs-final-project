import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

function Registration () {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
          body: JSON.stringify({ username, password1, password2, email }),
        };
        const response = await fetch("/dj-rest-auth/registration/", options);
    
        if (!response.ok) {
          console.log(response.status);
          throw new Error("Network response not OK.");
        }
        const data = await response.json();
        Cookies.set("Authorization", `Token ${data.key}`)
        setUsername("");
        setPassword1("");
        setPassword2("");
        setEmail("");
      };

    return(
        <Container className='login-container'>
             <Row>
                <h2>Welcome</h2>
                <h3>create new account</h3>
            </Row>
            <Row>    
                <Col>  
                    <Form onSubmit={handleSubmit}>
                    <div>
                    <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" 
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    />
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="password1">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password"  
                    value={password1}
                    onChange={(event) => setPassword1(event.target.value)}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Please enter password again:</Form.Label>
                    <Form.Control type="password"  
                    value={password2}
                    onChange={(event) => setPassword2(event.target.value)}
                    />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Register
                    </Button> 
                    </div>
                    <a href="#"><h4>Already have an account?</h4></a>
                    </Form>
                </Col>  
            </Row>
        </Container>
    )
}

export default Registration