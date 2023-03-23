import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import React from "react";
import { useLottie } from "lottie-react";
import animationData from "./spinner/80684-yoga.json";
//frontend/static/src/apps/auth/auth-context/s

// current context value from the closest matching *Provider* above it
// exporting AuthContext to allow use in other components
export const AuthContext = createContext();

//instead of sending props, we send children
export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userID, setUserID] = useState([]);
  const navigate = useNavigate();

  //login request
  const login = async (user) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("/dj-rest-auth/login/", options);
    if (!response.ok) {
      throw new Error("Network response was not OK!");
    }
    const data = await response.json();
    Cookies.set("Authorization", `Token ${data.key}`);
    //set authentication, if successful to TRUE instead of NULL
    setIsAuthenticated(true);
    //return home using ROUTER
    navigate("/friend-stories");
  };  

  const register = async (user) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch("/dj-rest-auth/registration/", options);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    Cookies.set("Authorization", `Token ${data.key}`);
    //set authentication, if successful to TRUE instead of NULL
    setIsAuthenticated(true);
    //return home using ROUTER
    navigate("/profile");
  };

  const logout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    await fetch("/dj-rest-auth/logout/", options);
    Cookies.remove("Authorization");
    //set authentication, if successful to FALSE instead of TRUE
    setIsAuthenticated(false);
    //return login using ROUTER so unauthenticated users do not see
    //content meant only for users
    navigate("/login");
  };

  // useEffect(() => {
  //   // check if the user is authenticated or not
  //   if (isAuthenticated) {
  //     // delay the redirect by 3 seconds
  //     const redirectTimer = setTimeout(() => {
  //       navigate("/profile");
  //     }, 3000);

  //     // cleanup function to cancel the timer if the component unmounts
  //     return () => {
  //       clearTimeout(redirectTimer);
  //     };
  //   }
  // }, [isAuthenticated, navigate]);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      //if response is not ok return + setIsAuthenticated to false
      if (!response.ok) {
        setIsAuthenticated(false);
        return;
      }
      const data = await response.json();
      setIsAuthenticated(true);
      setUserID(data);
    };

    setTimeout(getUser, 2000);
  }, []);

  // useEffect(() => {
  //   const getUserID = async () => {
  //     const response = await fetch(`/dj-rest-auth/user/`);
  //     if (!response.ok) {
  //       throw new Error("Network response not OK");
  //     }
  //     const data = await response.json();
  //     setUserID(data);
  //   };
  //   setTimeout(getUserID, 1000);
  // }, []);

  const lottieCat = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { View } = useLottie(lottieCat);

  //if isAuthenticated value of null, display 'is loading'
  //TODO add spinner
  if (isAuthenticated === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10%",
        }}
        className="spinner-container"
      >
        {View}
      </div>
    );
  }
  // if (isAuthenticated) {

  // }

  return (
    //Every Context object comes with a Provider React component that allows
    // consuming components to subscribe to context changes
    // context changes isAuthenticated, login, register, logout
    <AuthContext.Provider
      value={{ isAuthenticated, login, register, logout, userID }}
    >
      {children}
    </AuthContext.Provider>
  );
};
