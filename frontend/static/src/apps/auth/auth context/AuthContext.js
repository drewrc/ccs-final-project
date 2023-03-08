import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// current context value from the closest matching *Provider* above it 
// exporting AuthContext to allow use in other components 
export const AuthContext = createContext();

//instead of sending props, we send children
export const AuthContextProver = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
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
        }
        const response = await fetch('/dj-rest-auth/login', options)
        if (!response.ok) {
            throw new Error("Network response was not OK!")
        }
        const data = await response.json()
        Cookies.set("Authorization", `Token ${data.key}`)
        //set authentication, if successful to TRUE instead of NULL
        setIsAuthenticated(true);
        //return home using ROUTER
        navigate("/");
    }



const register = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify(user),
    }
    const response = await fetch("/dj-rest-auth/registration/", options)
    if (!response.ok) {
        throw new Error("Network response was not OK")
      }
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`)
     //set authentication, if successful to TRUE instead of NULL
       setIsAuthenticated(true);
     //return home using ROUTER
       navigate("/");
    }

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
    
      useEffect(() => {
        const getUser = async () => {
          const response = await fetch("/dj-rest-auth/user/");
        //if response is not ok return + setIsAuthenticated to false
          if (!response.ok) {
            setIsAuthenticated(false);
            return;
          }
    
          setIsAuthenticated(true);
        };
    
        getUser();
      }, []);
    
    //if isAuthenticated value of null, display 'is loading'
    //TODO add spinner   
      if (isAuthenticated === null) {
        return <div>Is loading ...</div>;
      }
    
      return (
        //Every Context object comes with a Provider React component that allows 
        // consuming components to subscribe to context changes
        // context changes isAuthenticated, login, register, logout 
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };
