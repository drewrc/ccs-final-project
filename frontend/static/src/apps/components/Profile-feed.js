import React, { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../auth/auth-context/AuthContext";
import Cookies from "js-cookie";
import { Modal, Box, Typography } from "@mui/material";


function ProfileFeed({username, profile_pic, profile_banner, id}) {
    const { userID } = useContext(AuthContext);
    const [ editProfilePic, setEditProfilePic ] = useState(false)
    const [ editProfileBanner, setEditProfileBanner ] = useState(false)

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
      };

    const handleEditClickPic = () => setEditProfilePic(true);
    const handleCancelPic = () => setEditProfilePic(false);

    const handleEditClickBanner = async (e) => {
        e.preventDefault();
        setEditProfileBanner(true)
    }
    const handleCancelBanner = async (e) => {
        e.preventDefault();
        setEditProfileBanner(false) 
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


        {!editProfileBanner && username === userID.username && (
                    <span className="edit-profile-banner">
                    <button 
                        onClick={handleCancelBanner}
                        className="edit-profile-pic-button" 
                        type="submit">
                           <FontAwesomeIcon icon={faPencil} style={{ color: 'white' }}/>
                    </button>
                  </span>
            )}
      

        <img className="profile-banner-display" src={profile_banner} height="100%" width="100%"/>

                
            <div className="profile-pic-container">


                  {!editProfilePic && username === userID.username && (
                    <span className="edit-profile-pic">
                    <button 
                        onClick={handleEditClickPic}
                        className="edit-profile-pic-icon-button" 
                        type="submit">
                           <FontAwesomeIcon icon={faPencil} style={{ color: 'white' }}/>
                    </button>
                  </span>
                  )}

                {editProfilePic && username === userID.username && (
                    <div>
    
                          <Modal open={editProfilePic} onClose={handleCancelPic}>
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Edit Profile Picture
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <button onClick={handleCancelPic} className="cancel-profile-pic-button" type="submit">
                                Cancel
                                </button>
                            </Typography>
                            </Box>
                        </Modal>
                        </div>
                  )}


                    <img className="profile-pic" src={profile_pic} height="250" />
            </div>
        </div>
    <h1 className="name-holder">{username}</h1>
                
</div>
    )
}

export default ProfileFeed