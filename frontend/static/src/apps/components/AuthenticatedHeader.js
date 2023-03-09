import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import '../styles/views.css'

function AuthenticatedHeader () {
    const [matchRequestCount, setMatchRequestCount] = useState(0);
  
    useEffect(() => {
        const getMatches = async () => {
          const response = await fetch(`/api_v1/match_request_count/`);
          if (!response.ok) {
            throw new Error("Network response not OK");
          }
          const data = await response.json();
          setMatchRequestCount(data);
        };
        getMatches();
      }, []);
  

return (
    <>
    <div>
        {[false].map((expand) => (
            <Navbar key={expand} expand={expand} className="mb-3">
            <Container fluid>
                <div className="right-side-nav">
                <Navbar.Brand href="#">Navbar 
                {matchRequestCount > 0 && (
                <span id="alert-notification" className="badge bg-danger ms-2">{matchRequestCount}</span>
                )}
                <FontAwesomeIcon className="fa-fw" id="bell-icon-parent" icon={faBell} />
                <FontAwesomeIcon icon={faMessage} />
                </Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Side nav
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
              
                    <Link to="/logout" id="nav">
                        Logout
                    </Link>
                    <Link to="/user-feed" id="nav">
                        Home
                    </Link>
                    <Link to="/user-messages" id="nav">
                        Messages
                    </Link>
                    <Link to="/user-match" id="nav">
                        Match
                    </Link>
                    <Link to="/user-timeline" id="nav">
                        Profile
                    </Link>

                    <NavDropdown
                        title="Dropdown"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                        Another action
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                        Something else here
                            </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                         aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
        ))}
        </div>
    </>
)
}
export default AuthenticatedHeader


