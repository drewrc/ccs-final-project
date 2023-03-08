import Cookies from "js-cookie";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

function LogOut() {

    const handleLogout = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch("/dj-rest-auth/logout/", options);
    if (!response.ok) {
      console.log(response.status);
      throw new Error("Network response not OK.");
    } else {
        console.log('logged out successfully')
        console.log(response.status);
    Cookies.remove("Authorization");
    }
  }

  return (
    <>
      <div className="log-out">
        <h2>You have been logged out.</h2>
       <Spinner animation="border" variant="light" />
      <button onClick={handleLogout}>Click here to log out </button>if not redirected in 5 seconds ... 
      </div>
    </>
  );
}

export default LogOut;
