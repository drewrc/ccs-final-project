import Post from "../components/Post";
import '../styles/unauthhome.css'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer, faMeteor, faReply } from "@fortawesome/free-solid-svg-icons";

function UnauthHome() {
  React.useEffect(() => {
    document.body.style.background = 'linear-gradient(217deg, rgba(255, 0, 98, 0.2), rgb(255, 158, 61, 0.3))'
  }, []);

  return (
    <>
      <div id="home-container">
        <div 
        className="animation-border">
        </div>
        <div className="header-text"> FitBuddies </div>
        <div className="arrow-down"></div>
        <div className="entrance-text">
          <div className="entrance-text-p">
           <h3> 
            {/* <FontAwesomeIcon icon={faArrowPointer} />  */}
            
            make new friends</h3>
            <h2>stay healthy <FontAwesomeIcon icon={faReply} /></h2>
          </div>
            
            <p><Link to="/login" id="nav" className="enter-button">Login</Link></p>
            <p><Link to="/register" id="nav" className="enter-button">Sign Up</Link></p>
        </div>
      </div>
   
    </>
  );
}

export default UnauthHome;