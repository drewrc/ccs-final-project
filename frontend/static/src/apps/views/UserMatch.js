import { useState, useEffect, useRef } from "react";
import UserMatchObject from "../components/UserMatchObject";
import TinderCard from 'react-tinder-card'
import '../styles/views.css'
import Cookies from "js-cookie";
import React from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@mui/material";

function UserMatch (from_user, id) {
    const [profiles, setProfiles] = useState([]);
    const [lastDirection, setLastDirection] = useState()
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [friendRequests, setFriendRequests] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const cardRef = useRef(null);
    const isMobile = useMediaQuery("(max-width:600px)");

    console.log({currentProfileIndex})
    console.log(profiles.length)
    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    const openRequests = open ? 'simple-popper' : undefined;

    React.useEffect(() => {
        document.body.style.background = 'linear-gradient(217deg, rgba(255, 0, 98, 0.2), rgb(255, 158, 61, 0.3))'
      }, []);
    
    useEffect(() => {
      const getProfiles = async () => {
        const response = await fetch(`/api_v1/new_friends/`);
        if (!response.ok) {
          throw new Error("Network response not OK");
        }
        const data = await response.json();
        setProfiles(data);
      };
      getProfiles();
    }, []);


    const swipe = (dir, nameToDelete, userID, delta) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(dir)
      
        const lastPos = cardRef.current?.offsetLeft
        const initialPos = cardRef.current?.offsetLeft
      
        if (dir === 'right') {
          sendMatchRequest(userID)
        } else if (dir === 'left') {
            offScreen(nameToDelete)
        }
      
        if (Math.abs(lastPos - initialPos) > delta) {
          offScreen(nameToDelete)
        }
      }
    
      const offScreen = (name) => {
        console.log(name + ' left the screen!')
        //reset logic as long as currentProfileIndex < profiles.length
        if (currentProfileIndex === profiles.length - 1) {
            setCurrentProfileIndex(0);
        } else {
        //increase index of currentprofileindex by 1 
            setCurrentProfileIndex(currentProfileIndex + 1);
        }
      }

    const currentProfile = profiles[currentProfileIndex];

    const sendMatchRequest = async (userID) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")
            },
        }
        const response = await fetch(`/api_v1/send_match_request/${userID}/`, options
        );
        const data = await response.json();
    }

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

    const matchHTML = friendRequests.map((request) => (
        <>
        <div>
            <p>
                {request.from_user}
                </p>
                <p>
                <button>
                    accept
                </button>
                    <button>
                        delete
                    </button>
                </p>
        </div>
        </>
    ))
// console.log({currentProfileIndex})
console.log({currentProfileIndex})
    return (
        <div>
            <Container
            style={{
                height: '100vh',
            }}
            >
                <Row
                //   style={{width: '50vw',
                //     marginLeft: 'auto',
                //     marginRight: 'auto',
                // }}
                
                >
                    {/* <Col className="new-matches-list-display" xs={3}>
                    <h2>New Matches!</h2> */}
{/* 
                    <div>
                    <button aria-describedby={openRequests} type="button" onClick={handleClick}>
                        Matches
                    </button>
                    <Popper id={openRequests} open={open} anchorEl={anchorEl}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                        {matchHTML}
                        </Box>
                    </Popper>
                    </div> */}


{/*                    
                    </Col> */}
                    <Col >
                    <div>
                    <h2 className="header">Swipe Right to add friends</h2>
                    {/* <p>swipe left to view next profile </p> */}
                        </div>
                        <div className="user-object-placeholder">
                       
                        {currentProfile && (
                                <TinderCard 
                                className="swipe" 
                                key={currentProfile.id}
                                preventSwipe={["up", "down"]} 
                                onSwipe={(dir) => swipe(dir, currentProfile.username, currentProfile.id, 50)}
                                onCardLeftScreen={() => offScreen(currentProfile.username)}
                              
                                >
                                <div 
                                //   style={{background: 'rgb(120,120,255)'}}
                                className="tinder-card-placeholder">
                                <div className="profile-banner-tinder-card">
                                <img className="profile-banner-display-tinder-card" src={currentProfile.profile_banner} width="100%" height='50%'  />
                                <div className="profile-pic-container-tinder-card">
                                    <img className="profile-pic-tinder-card" src={currentProfile.profile_pic} />
                                </div>
                                <div className="tinder-card-info">
                                <h2 className="tinder-username">{currentProfile.username}</h2>
                                <p id="profile-pronouns"> ({currentProfile.pronouns})</p>
                                <p id="profile-location">{currentProfile.gym_location}</p>
                                <p>{currentProfile.biography}</p>
                                </div>
                                </div>
                                </div>
                                </TinderCard>
                            )}
                            <div className="desktop-buttons"> 
                            {!isMobile && (
                                <>
                                <button className="match-button">
                                <FontAwesomeIcon icon={faAnglesLeft} 
                                onClick={() => setCurrentProfileIndex(currentProfileIndex + 1)}
                                /> next
                                </button>
                            <button className="match-button" 
                            onClick={() => sendMatchRequest(currentProfile.id)}
                            >
                                match <FontAwesomeIcon icon={faAnglesRight} />
                            </button> 
                            </>
                            )}
                            </div>
                        </div>
                        <div className="swipe-direction">
                        {lastDirection ? <h2 className='infoText'>
                            You swiped {lastDirection}</h2> : <h2 className='infoText' />}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UserMatch