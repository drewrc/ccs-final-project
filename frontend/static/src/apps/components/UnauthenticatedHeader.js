import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faDumbbell, faArrowPointer } from '@fortawesome/free-solid-svg-icons'

function UnauthenticatedHeader () {

return (
    <>
    <div>
        {['xxl',].map((expand) => (
            <Navbar id="header" key={expand} expand={expand} className="mb-3">
            <Container fluid>


                    <Link id="nav" to="/UnauthHome">
                    FitBuddies
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
                    <p
                        style={{ 
                            marginTop: '100px'}}
                    >
                        <Link 
                          style={{ 
                            color: 'black'}}
                            id="side-naviagation-links"
                            to="/login">
                        <FontAwesomeIcon 
                        style={{ 

                            marginRight: '10px'}}
                        icon={faDumbbell}
                                    
                        />
                        Click to Login !</Link></p>
                        <p>
                            <Link 
                         style={{ 
                            color: 'black'}}
                        to="/register" id="side-naviagation-links">Create an Account !
                        <FontAwesomeIcon 
                        style={{ marginLeft: '10px'}}
                        icon={faArrowPointer} />
                        </Link>
                        </p>
                   
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
        ))}
        </div>
    </>
)
}
export default UnauthenticatedHeader


