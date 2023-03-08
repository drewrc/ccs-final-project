import { useState, useEffect } from "react";
import UserMatchObject from "../components/UserMatchObject";

function UserMatch () {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
      const getProfiles = async () => {
        const response = await fetch(`/api_v1/profiles/`);
        if (!response.ok) {
          throw new Error("Network response not OK");
        }
        const data = await response.json();
        setProfiles(data);
      };
      getProfiles();
    }, []);
  
    const matchHTML = profiles.map((profile) => (
      <div key={profile.id}>
        <UserMatchObject {...profile} />
      </div>
    ));


    return (
        <div>
            {matchHTML}
        </div>
    )
}

export default UserMatch