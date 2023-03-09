import { useState, useEffect } from "react";
import UserMatchObject from "../components/UserMatchObject";
import TinderCard from 'react-tinder-card'
import '../styles/views.css'
import Cookies from "js-cookie";

function UserMatch () {
    const [profiles, setProfiles] = useState([]);
    const [lastDirection, setLastDirection] = useState()
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

    // console.log({lastDirection})ew
    
    useEffect(() => {
      const getProfiles = async () => {
        const response = await fetch(`/api_v1/profiles/`);
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

        <div className="header">
            <h1>card container</h1>
        </div>

        <div className="user-object-placeholder">
        {currentProfile && (
                <TinderCard 
                className="swipe" 
                key={currentProfile.id}
                onSwipe={(dir) => swipe(dir, currentProfile.username, currentProfile.id)}
                onCardLeftScreen={() => offScreen(currentProfile.username)}>
                {currentProfile.username}
                </TinderCard>
            )}
        </div>
        <div className="swipe-direction">
        {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
        </div>
        </div>
    );
};

export default UserMatch