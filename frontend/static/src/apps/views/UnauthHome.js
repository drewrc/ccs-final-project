import Post from "../components/Post";
import '../styles/unauthhome.css'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer, faArrowRightToBracket, faDumbbell, faHandPointer, faHeartPulse, faMagicWandSparkles, faMeteor, faPersonRunning, faReply, faWandSparkles } from "@fortawesome/free-solid-svg-icons";
import './workingoutwoman2.png'

function UnauthHome() {
  React.useEffect(() => {
    // document.body.style.backgroundColor = 'rgb(223, 10, 59)';
    //  background-color: rgb(144, 1, 53);
    // document.body.style.backgroundColor = 'rgb(125, 10, 9)'
    document.body.style.background = 'linear-gradient(217deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, .2))';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, []);

  return (
    <>
      <div id="home-container">
        <div 
        className="animation-border">
        </div>
        <div className="header-text">
          {/* <FontAwesomeIcon icon={faDumbbell} />  */}
          FitBuddies 
        <FontAwesomeIcon icon={faPersonRunning} /> 
        </div>
        <div className="arrow-down"></div>
        <div className="entrance-text entrance-text-p">
          {/* <div className="entrance-text-p"> */}
           {/* <h3>  */}
            {/* <FontAwesomeIcon icon={faArrowPointer} />  */}
            
            {/* make new friends</h3>
            <h2>stay healthy <FontAwesomeIcon icon={faReply} /></h2>
          </div> */}
            <p><Link to="/login" id="nav" className="enter-button">
           
              Click to Login</Link></p>
            <p><Link to="/register" id="nav" className="enter-button">Create an Account
            <FontAwesomeIcon 
              style={{ marginLeft: '10px'}}
              icon={faArrowPointer} />
              </Link></p>
        </div>
      </div>
   
    </>
  );
}

export default UnauthHome;