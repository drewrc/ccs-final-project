import React from "react";

function ProfileFeed({username, profile_pic, profile_banner}) {

    return (
        <div>
        <div className="profile-banner">
        <div className="banner-overlay"></div>
        <img className="profile-banner-display" src={profile_banner} height="100%" width="100%"/>
                <div className="profile-pic-container">
                    <img className="profile-pic" src={profile_pic} height="250" />
                </div>
        </div>
        <h1 className="name-holder">{username}</h1>
        </div>
    )
}

export default ProfileFeed