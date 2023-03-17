import React, { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../auth/auth-context/AuthContext";
import Cookies from "js-cookie";
import { Modal, Box, Typography } from "@mui/material";



function ProfileFeed({id, profile_pic, profile_banner, username}) {
    //WARNING ------>>>> id = PROFILE.id ---->>>>>>>
    const { userID } = useContext(AuthContext);
    const [ editProfilePic, setEditProfilePic ] = useState(false)
    const [ editProfileBanner, setEditProfileBanner ] = useState(false)
    const handleOpen = () => editProfilePic(true);
    const handleClose = () => editProfilePic(false);
    // const handleOpenBanner = () => setEditProfileBanner(true);
    // const handleCloseBanner = () => setEditProfileBanner(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
      };

    const handleEditClick = async (e) => {
        e.preventDefault();
        setEditProfilePic(true)
    }

    const handleEditClickBanner = async (e) => {
        e.preventDefault();
        setEditProfileBanner(true)
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
    console.log({editProfileBanner})
    console.log({editProfilePic})
    return (
        <div>
        <div className="profile-banner">
        {!editProfilePic && id === userID.pk && (
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
                  {!editProfileBanner && id === userID.pk && (
                    <span className="edit-profile-pic">
                    <button 
                        onClick={handleEditClickBanner}
                        className="edit-profile-pic-icon-button" 
                        type="submit">
                           <FontAwesomeIcon icon={faPencil} style={{ color: 'white' }}/>
                    </button>
                  </span>
                  )}



                {editProfileBanner && username === userID.username && (
                                    <div >
                                        BANNER!!
                                        <button onClick={handleCloseBanner}>
                                            cancel me!
                                            </button>
                                        </div>
                                )}

                  
                   {editProfilePic && id === userID.pk && (
                    <>
                          <Modal open={editProfilePic} onClose={handleClose}>
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Edit Profile Picture
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {/* <button onClick={handleDelete} className="delete-profile-pic-button" type="submit">
                                <FontAwesomeIcon icon={faTrashCan} style={{ color: "red" }} />
                                </button> */}
                                <button onClick={handleClose} className="cancel-profile-pic-button" type="submit">
                                Cancel
                                </button>
                            </Typography>
                            </Box>
                        </Modal>
                    
                    </>
                  )}

                 
                                                    
                    


                    <img className="profile-pic" src={profile_pic} height="250" />
            </div>
        </div>
    <h1 className="name-holder">{username}</h1>
                
</div>
    )
}

export default ProfileFeed