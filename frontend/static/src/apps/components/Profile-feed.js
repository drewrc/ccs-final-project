import React from "react";

function ProfileFeed({username, profile_pic, profile_banner}) {

    return (
        <div>
        <div className="profile-banner">
        <img className="preview-image" src={profile_banner} height="100%" width="100%"/>
        </div>
        <img className="preview-image" src={profile_pic} height="100" />
            <h1>Name: {username}</h1>
        </div>
    )
}

export default ProfileFeed