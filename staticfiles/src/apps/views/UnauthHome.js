import Post from "../components/Post";
import '../styles/unauthhome.css'
import { Link } from "react-router-dom";

function UnauthHome() {
  return (
    <>
      <div id="home-container">
        <div 
        className="animation-border">
        </div>
        <div className="header-text"> SWOLEMATES </div>
        <div className="arrow-down"></div>
        <div className="entrance-text">
            <p className="entrance-text-p">make new friends</p>
            <p className="entrance-text-p">stay healthy</p>
            <p><Link to="/login" id="nav" className="enter-button">Login</Link></p>
            <p><Link to="/register" id="nav" className="enter-button">Sign Up</Link></p>
        </div>
      </div>
   
    </>
  );
}

export default UnauthHome;