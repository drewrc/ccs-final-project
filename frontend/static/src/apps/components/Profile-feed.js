import React, { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPencil,
  faMountainSun,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../auth/auth-context/AuthContext";
import Cookies from "js-cookie";
import { Modal, Box, Typography } from "@mui/material";

import './assets/defaultbanner1.png';
import './assets/profilepicdefault_WXPRrRd.png'

function ProfileFeed({
  username,
  profile_pic,
  profile_banner,
  id,
  first_name,
  last_name,
}) 
{
  const { userID } = useContext(AuthContext);
  const [editProfilePic, setEditProfilePic] = useState(false);
  const [editProfileBanner, setEditProfileBanner] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState("");
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [newBanner, setNewBanner] = useState("");
  const [newBannerPreview, setNewBannerPreview] = useState("");
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);

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

  const fallbackImage = './assets/defaultbanner1.png'
  const profileDefault = './assets/profilepicdefault_WXPRrRd.png'

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };
  const handleProfilePicError = (e) => {
    e.target.src = profileDefault;
  };

  const handleProfilePic = (e) => {
    const profilepic = e.target.files[0]; // set file
    setNewProfilePic(profilepic);

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePicPreview(reader.result); // set preview
    };

    reader.readAsDataURL(profilepic);
  };

  const handleBannerPic = (e) => {
    const bannerPic = e.target.files[0]; // set file
    setNewBanner(bannerPic);

    const reader = new FileReader();

    reader.onloadend = () => {
      setNewBannerPreview(reader.result); // set preview
    };

    reader.readAsDataURL(bannerPic);
  };

  const handleEditClickPic = () => setEditProfilePic(true);
  const handleCancelPic = () => setEditProfilePic(false);
  const handleEditClickBanner = () => setEditProfileBanner(true);
  const handleCancelBanner = () => setEditProfileBanner(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    const options = {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch(`/api_v1/user_edit_profile/${id}/`, options);
    const data = await response.json();
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_pic", newProfilePic);
    formData.append("profile_banner", newBanner);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch(`/api_v1/user_edit_profile/${id}/`, options);
    const data = await response.json();
    setProfilePicPreview("");
    setNewBannerPreview("");
  };

  console.log({profile_banner})
  return (
    <div>
       <div className="profile-banner" style={{ width: "100" }}>
        {!editProfileBanner && username === userID.username && (
          <span className="edit-profile-banner">
            <button
              onClick={handleEditClickBanner}
              className="edit-profile-pic-button"
              type="submit"
            >
              <FontAwesomeIcon icon={faPencil} style={{ color: "white" }} />
            </button>
          </span>
        )}

        {editProfileBanner && username === userID.username && (
          <>
            <Modal open={editProfileBanner} onClose={handleCancelBanner}>
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Profile Banner
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {newBannerPreview && (
                    <div className="center-preview">
                      <img
                        className="preview-image"
                        src={newBannerPreview}
                        height="100"
                      />
                    </div>
                  )}
                  <label
                    htmlFor="new-banner-pic"
                    style={{ backgroundColor: "#CACACA" }}
                    className="btn"
                  >
                    <FontAwesomeIcon icon={faMountainSun} /> Upload a file
                  </label>
                  <input
                    id="new-banner-pic"
                    type="file"
                    onChange={handleBannerPic}
                    style={{ display: "none" }}
                  />
                  <button onClick={handleSaveProfile} type="submit">
                    Save
                  </button>

                  <button
                    onClick={handleCancelBanner}
                    className="cancel-profile-pic-button"
                    type="submit"
                  >
                    Cancel
                  </button>
                </Typography>
              </Box>
            </Modal>
          </>
        )}

  
              <img
                style={{
                  transform: "scale(1)",
                  transition: "transform 0.2s ease-in-out",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
                className="profile-banner-display"
                src={profile_banner}
                onError={handleImageError}
                height="100%"
                width="100%"
              />
      

        <div className="profile-pic-container">
          {!editProfilePic && username === userID.username && (
            <span className="edit-profile-pic">
              <button
                onClick={handleEditClickPic}
                className="edit-profile-pic-icon-button"
                type="submit"
              >
                <FontAwesomeIcon icon={faPencil} style={{ color: "white" }} />
              </button>
            </span>
          )}

          {editProfilePic && username === userID.username && (
            <div>
              <Modal open={editProfilePic} onClose={handleCancelPic}>
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Edit Profile Picture
                    {profilePicPreview && (
                      <div className="center-preview">
                        <img
                          className="preview-image"
                          src={profilePicPreview}
                          height="100"
                        />
                      </div>
                    )}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <label
                      htmlFor="new-profile-pic"
                      style={{ backgroundColor: "#CACACA" }}
                      className="btn"
                    >
                      <FontAwesomeIcon icon={faMountainSun} /> Upload a file
                    </label>
                    <input
                      id="new-profile-pic"
                      type="file"
                      onChange={handleProfilePic}
                      style={{ display: "none" }}
                    />
                    <button onClick={handleSaveProfile} type="submit">
                      Save
                    </button>
                    <button
                      onClick={handleCancelPic}
                      className="cancel-profile-pic-button"
                      type="submit"
                    >
                      Cancel
                    </button>
                  </Typography>
                </Box>
              </Modal>
            </div>
          )}

            <img
                className="profile-pic"
                src={profile_pic}
                height="250"
                onError={handleProfilePicError}
              />
        </div>
      </div>
      <h1 className="name-holder">{username}</h1>
    </div>
  );
}

export default ProfileFeed;
