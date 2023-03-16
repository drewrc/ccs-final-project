import React, { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../auth/auth-context/AuthContext";
import Cookies from "js-cookie";


function ProfileFeed({username, profile_pic, profile_banner, id}) {
    const { userID } = useContext(AuthContext);
    const [ editProfile, setEditProfile ] = useState(false)

    const handleEditClick = async (e) => {
        e.preventDefault();
        setEditProfile(true)
    }
    const handleDelete = async (e) => {
    e.preventDefault();
    const options ={
        method: "DELETE",
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    }
        const response = await fetch(`/api_v1/user_edit_profile/${id}/`, options);
        const data = await response.json();
    }

    return (
        <div>
        <div className="profile-banner">
        {!editProfile && username === userID.username && (
                    <span className="edit-profile-banner">
                    <button 
                        onClick={handleEditClick}
                        className="edit-profile-pic-button" 
                        type="submit">
                           <FontAwesomeIcon icon={faPencil} style={{ color: 'white' }}/>
                    </button>
                  </span>
            )}

        <img className="profile-banner-display" src={profile_banner} height="100%" width="100%"/>
                
            <div className="profile-pic-container">
                  {!editProfile && username === userID.username && (
                    <span className="edit-profile-pic">
                    <button 
                        onClick={handleEditClick}
                        className="edit-profile-pic-icon-button" 
                        type="submit">
                           <FontAwesomeIcon icon={faPencil} style={{ color: 'white' }}/>
                    </button>
                  </span>
                  )}
                    <img className="profile-pic" src={profile_pic} height="250" />
            </div>
        </div>
    <h1 className="name-holder">{username}</h1>
                
</div>
    )
}

export default ProfileFeed