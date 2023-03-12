import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

function UnauthenticatedHeader () {

return (
    <>
    <div>
        {[false].map((expand) => (
            <Navbar id="header" key={expand} expand={expand} className="mb-3">
            <Container fluid>
                <Link id="nav" to="/UnauthHome">
                Gym Buddies
                </Link>
                
                <Link to="/">
                <FontAwesomeIcon icon="fa-duotone fa-bell" />
                </Link>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                >
                        <Link to="/user-feed" id="side-nav">
                        Home
                         </Link>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                         aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                            

                        <Link to="/user-feed" id="nav">
                        Home
                         </Link>

                        </Form>
         
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
        ))}
        </div>
    </>
)
}
export default UnauthenticatedHeader


