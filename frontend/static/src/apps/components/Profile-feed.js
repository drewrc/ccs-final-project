import React from "react";

function ProfileFeed({username}) {

    return (
        <div>
        <div className="profile-banner"></div>
            <h1>{username}</h1>
        </div>
    )
}

export default ProfileFeed