import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faEnvelope, faHouseChimney, faMessage, faPersonWalkingArrowRight, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/auth-context/AuthContext";
import "../styles/views.css";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Cookies from "js-cookie";
import { makeStyles, Popover } from "@mui/material";


function AuthenticatedHeader({ id }) {
  const [matchRequestCount, setMatchRequestCount] = useState(0);
  const [friendRequests, setFriendRequests] = useState([]);
  const { logout } = useContext(AuthContext);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [messageNotifications, setMessageNotifications] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  // const handleClick = (event) => {
  //   setAnchorEl(anchorEl ? null : event.currentTarget);
  // };

  // const open = Boolean(anchorEl);
  // const openRequests = open ? "simple-popper" : undefined;

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

  // useEffect(() => {
  //   const getMessageNotifications = async () => {
  //     const response = await fetch (`/api_v1/unread_messages/`);
  //     if (!response.ok) {
  //       throw new Error('Network response not OK');
  //     }
  //     const data = await response.json();
  //     setMessageNotifications(data);
  //   };
  //   getMessageNotifications()
  // }, []);
  useEffect(() => {
    const getMessageNotifications = async () => {
      const options = {
        method: "GET",
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };
      const response = await fetch(`/api_v1/unread_messages/`, options);
      const data = await response.json();
      setMessageNotifications(data.unread_messages_count);
    };
    getMessageNotifications();
  });
  // console.log({messageNotifications})

  useEffect(() => {
    const fetchMatchRequests = async () => {
      const response = await fetch("/api_v1/friend_requests/");
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      const data = await response.json();
      setFriendRequests(data);
    };
    fetchMatchRequests();
  }, []);
  console.log({ friendRequests });

  const handleAcceptFriendRequest = async (id) => {
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      // body: JSON.stringify(user)
    };

    const response = await fetch(
      `/api_v1/accept_match_request/${id}/`,
      options
    );
    const data = await response.json();

    const updatedFriendRequests = [...friendRequests];
    const index = updatedFriendRequests.findIndex(
      (request) => request.id === id
    );
    updatedFriendRequests.splice(index, 1);
    setFriendRequests(updatedFriendRequests);

    setMatchRequestCount(matchRequestCount - 1);
  };

  const matchHTML = friendRequests.map((request) => (
    <>
      <div key={request.id}>
        <p
          style={{
            paddingTop: "5%",
            fontSize: "20px",
            paddingLeft: "10px",
            width: "15vw",
          }}
        >
          {request.from_user}
        </p>
        <p>
          <button
            style={{
              borderRadius: "10px",
              border: "none",
            }}
            id="send-button"
            onClick={() => handleAcceptFriendRequest(request.id)}
          >
            Accept
          </button>
          <button
            style={{
              borderRadius: "10px",
              border: "none",
            }}
            id="send-button"
          >
            Delete
          </button>
        </p>
      </div>
    </>
  ));

  return (
    <>
      <div
       style={{width: '100vw',}}
      >
        {[false].map((expand) => (
          <Navbar 
          style={{
            outline: 'none',
          }}
          id="header" key={expand} expand={expand} className="mb-3 border-1">
            <Container fluid>
              <div className="right-side-nav">
                <Link to="/friend-stories" className="left-nav" id="nav">
                  FitBuddies
                </Link>
                {/* {matchRequestCount > 0 && (
                  <span
                    id="alert-notification"
                    className="badge bg-danger ms-2"
                  >
                    {matchRequestCount}
                  </span>
                )} */}
               
                <button
                  style={{
                    backgroundcolor: "none",
                    background: "none",
                    border: "none",
                    // marginRight: '-10px',
                  }}
                    type="button"
                    className="btn btn-secondary"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                     <Link to="/user-match" className="left-nav" id="nav">
                  <FontAwesomeIcon

                    className="fa-fw "
                    id="bell-icon-parent"
                    icon={faBell}
                    style={{
                      fontSize: '20px',
                      color: "white",
                    }}
                  />
                    </Link>
                  {matchRequestCount > 0 && (
                    <span
                      id="alert-notification"
                      className="badge bg-danger ms-2"
                    >
                      {matchRequestCount}
                    </span>
                  )}
                </button>
          
                <Popover
                  id="matches-popover"
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box
                    sx={{
                      // marginLeft: "10%",
                      border: "none",
                      // borderRadius: "10px",
                      border: 1,
                      p: 3,
                      bgcolor: "background.paper",
                    }}
                  >
                    <h3 style={{ 
                         color:'rgba(212, 25, 0, 0.84)',
                         fontFamily: 'Roboto Condensed, sans-serif',
                         fontSize: '25px',
                      textAlign: 'center',
                      paddingTop: "5%" }}>New Matches</h3>
                    {matchRequestCount > 0 ? (
                      matchHTML
                    ) : (
                      <span>
                        <p
                        
                          style={{
                            textAlign: "center",
                            color:'rgba(212, 25, 0, 0.84)',
                            fontFamily: 'Roboto Condensed, sans-serif',
                          }}
                        >
                          You have no matches right now...
                        </p>
                      </span>
                    )}
                  </Box>
                </Popover>

                <Link to="/user-messages" className="left-nav" id="nav">
                  <FontAwesomeIcon icon={faMessage} />
                  {messageNotifications > 0 && (
                    <span
                      id="message-notification"
                      className="badge bg-danger ms-2"
                    >
                      {messageNotifications}
                    </span>
                  )}
                </Link>
              </div>
              <Navbar.Toggle aria-controls="offcanvasNavbar" icon={<FontAwesomeIcon icon={faBars} />} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title 
                 
                  id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Side nav
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body
                style={{
                  marginTop: '-1%',
                  backgroundColor: 'rgb(249,206,196)',
                }}
                >
                  <Nav >
                    {/* <Link to="/logout" id="side-nav">
                      Logout
                    </Link> */}
                    <button 
                
                     style={{
                       border: 'none',
                     }}
                     
                   
                    className="nav-btn" id="special-button side-nav" onClick={logout}>
                    Logout
                      <FontAwesomeIcon
                      style={{
                        paddingLeft: '5px',
                      }}
                      
                      icon={faPersonWalkingArrowRight} />  
                    </button>
                    <Link to="/friend-stories" className="nav-btn" id="side-nav">
                    
                      <FontAwesomeIcon
                      style={{
                        paddingRight: '5px',
                      }}
                      
                      icon={faHouseChimney} />  Home
                    </Link>
                    <Link to="/user-messages" className="nav-btn" id="side-nav">
                    <FontAwesomeIcon
                      style={{
                        paddingRight: '5px',
                      }}
                      
                      icon={faEnvelope} />  Messages
                    </Link>
                    <Link to="/user-match" className="nav-btn" id="side-nav">
                    <FontAwesomeIcon
                      style={{
                        paddingLeft: '5px',
                      }}
                      
                      icon={faUserGroup} />   Match 
                    </Link>
                    <Link to="/profile" className="nav-btn" id="side-nav">
                    <FontAwesomeIcon
                      style={{
                        paddingLeft: '5px',
                      }}
                      
                      icon={faUser} />  Profile
                    </Link>


                {/* SEARCHBAR */}
                    {/* <NavDropdown
                      title="Dropdown"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href="#action3">
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav> */}

                  {/* SEARCHBAR */}
                  {/* <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form> */}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>
    </>
  );
}
export default AuthenticatedHeader;
