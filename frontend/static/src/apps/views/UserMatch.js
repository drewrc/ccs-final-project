import { useState, useEffect } from "react";
import UserMatchObject from "../components/UserMatchObject";
import TinderCard from 'react-tinder-card'
import '../styles/views.css'

function UserMatch () {
    const [profiles, setProfiles] = useState([]);
    const [lastDirection, setLastDirection] = useState()

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
      }

    // const matchHTML = profiles.map((profile) => (
    //   <div key={profile.id}>
    //     <TinderCard 
    //         className="pressable"
    //         onSwipe={onSwipe} 
    //         onCardLeftScreen={() => onCardLeftScreen('fooBar')} 
    //         preventSwipe={['right', 'left']}>
    //     <UserMatchObject {...profile} />
    //     </TinderCard>
    //   </div>
    // ));



    return (
        <div>

        <div className="header">
            <h1>card container</h1>
        </div>

        <div className="user-object-placeholder">
        <div>
        {profiles.map((profile) =>
        <TinderCard 
        className="swipe" 
        key={profile.id}
        onSwipe={(dir) => swiped(dir, profile.username)}
        onCardLeftScreen={() => outOfFrame(profile.username)}>
        {profile.username}
        </TinderCard>
        )}
        </div>
        </div>
        <div className="swipe-direction">
        {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
        </div>
        </div>
    );
};

export default UserMatch