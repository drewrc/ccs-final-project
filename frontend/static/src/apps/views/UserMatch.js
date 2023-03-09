import { useState, useEffect } from "react";
import UserMatchObject from "../components/UserMatchObject";
import TinderCard from 'react-tinder-card'
import '../styles/views.css'

function UserMatch () {
    const [profiles, setProfiles] = useState([]);
    const [lastDirection, setLastDirection] = useState()
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

    console.log({lastDirection})
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
  
    const onSwipe = (direction) => {
        console.log('You swiped: ' + 'right')
    }
      
    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
      }
    
      const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
        if (currentProfileIndex === profiles.length - 1) {
            setCurrentProfileIndex(0);
        } else {
            setCurrentProfileIndex(currentProfileIndex + 1);
        }
      }

    const currentProfile = profiles[currentProfileIndex];

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
                onSwipe={(dir) => swiped(dir, currentProfile.username)}
                onCardLeftScreen={() => outOfFrame(currentProfile.username)}>
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