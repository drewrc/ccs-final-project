import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

function UnauthenticatedHeader () {

return (
    <>
    <div>
        {[false].map((expand) => (
            <Navbar key={expand} expand={expand} className="mb-3">
            <Container fluid>
                <Navbar.Brand href="#">Navbar

                <Link to="/register" id="nav">
                        Register
                    </Link>
                    <Link to="/login" id="nav">
                        Login
                    </Link>
            
                
                
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                >
     
                    

                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                         aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
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


