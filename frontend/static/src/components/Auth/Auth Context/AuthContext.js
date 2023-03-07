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
        //set authentication, if successful to TRUE instead of FALSE
        setIsAuthenticated(true);
        //return home using ROUTER
        navigate("/");
    }

}