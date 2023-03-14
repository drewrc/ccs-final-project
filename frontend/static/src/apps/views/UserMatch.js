import { useState, useEffect } from "react";
import UserMatchObject from "../components/UserMatchObject";
import TinderCard from 'react-tinder-card'
import '../styles/views.css'
import Cookies from "js-cookie";
import React from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

function UserMatch () {
    const [profiles, setProfiles] = useState([]);
    const [lastDirection, setLastDirection] = useState()
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);


    React.useEffect(() => {
        document.body.style.backgroundColor = "rgba(160, 160, 160, 0.2)";
      }, []);

    console.log({profiles})
    
    useEffect(() => {
      const getProfiles = async () => {
        const response = await fetch(`/api_v1/new_user/`);
        if (!response.ok) {
          throw new Error("Network response not OK");
        }
        const data = await response.json();
        setProfiles(data);
      };
      getProfiles();
    }, []);

    const swipe = (dir, nameToDelete, userID) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(dir)
        if (dir === 'down') {
            sendMatchRequest(userID)
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
        console.log({data})
        // if (!response.ok) {
        //     throw new Error("Network response not OK!")
        // }
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col className="new-matches-list-display" md={3}>
                    <h2>New Matches!</h2>
                    </Col>
                    <Col md={8}>
                    <div className="header">
                        </div>
                        <div className="user-object-placeholder">
                        {currentProfile && (
                            
                                <TinderCard 
                                
                                className="swipe" 
                                key={currentProfile.id}
                                onSwipe={(dir) => swipe(dir, currentProfile.username, currentProfile.id)}
                                onCardLeftScreen={() => offScreen(currentProfile.username)}>
                                <div className="tinder-card-placeholder">
                                <div className="profile-banner-tinder-card">
                                <img className="profile-banner-display-tinder-card" src={currentProfile.profile_banner} width="100%" height='50%'  />
                                <div className="profile-pic-container-tinder-card">
                                    <img className="profile-pic-tinder-card" src={currentProfile.profile_pic} width="250"/>
                                </div>
                                </div>
                                <p>{currentProfile.username}</p>
                                <p>{currentProfile.pronouns}</p>
                                </div>
                                </TinderCard>
                        
                            )}
                        </div>
                        <div className="swipe-direction">
                        {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
                        </div>
                    </Col>
                    <Col md={2}>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UserMatch