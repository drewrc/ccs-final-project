import Post from "../components/Post";
import { useState, useEffect } from "react";

function UserFeed() {
  const [userStories, setUserStories ] = useState ([])
///api_vi/stories/

useEffect(() => {
  const getUserStories = async () => {
    const response = await fetch(`/api_v1/stories/`);
    if (!response.ok) {
      throw new Error("Network response not OK");
    }
    const data = await response.json();
    setUserStories(data);
  };
  getUserStories();
}, []);

const userFeedHTML = userStories.map((post) => (
        <Post 
        {...post}
        />
        ))



  return (
    <>
      <div>I am the user feed component!</div>
      <Post />
      {userFeedHTML}
    </>
  );
}

export default UserFeed;
