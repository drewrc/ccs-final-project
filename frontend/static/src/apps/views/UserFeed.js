import Post from "../components/Post";
import { useState, useEffect, useContext } from "react";
import React from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Card } from "@mui/material";
import { TextField, Button } from "@mui/material";
import Cookies from "js-cookie";
import { useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun, faVideo } from "@fortawesome/free-solid-svg-icons";
import ProfileFeed from "../components/Profile-feed";
import Form from 'react-bootstrap/esm/Form'
import { AuthContext } from '../auth/auth-context/AuthContext';

function UserFeed() {
  const { isAuthenticated, userID } = useContext(AuthContext);

  React.useEffect(() => {
    document.body.style.backgroundColor = "rgba(160, 160, 160, 0.2)";
  }, []);

  const [userStories, setUserStories] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [file, setFile] = useState();
  const [authUser, setAuthUser] = useState("");
  const [activeCard, setActiveCard] = useState("posts");
  const [timelineId, setTimelineId] = useState(null);
  const [preview, setPreview] = useState("");
  const [profile, setProfile] = useState({})
  const [user, setUser] = useState(userID.username)
  console.log(user)
 
//------------------- > fetching TIMELINE ID  <--------------------//
  useEffect(() => {
    const fetchTimelineId = async () => {
      const response = await fetch("/api_v1/timelines/");
      const data = await response.json();
      setTimelineId(data.id);
    };
    fetchTimelineId();
  }, []);

  //------------------- > fetching PROFILE FOR USER (SELF)  <--------------------//
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch('/api_v1/current_user/')
      const data = await response.json();
      setProfile(data);
      console.log({data})
    }
    fetchUserProfile();
  }, []);
  console.log({profile})

  // const filterUser = profile.user === userID.pk ? (
  //   <ProfileFeed {...profile} />
  // ) : null;
 
  const bioHTML = (
    <div key={profile.id}>
      <p className="profile-content">Name: {profile.first_name} {profile.last_name}</p>
      <p className="profile-content">Location: {profile.gym_location}</p>
      <p className="profile-content">Pronouns: {profile.pronouns}</p>
      <p className="profile-content">Gender: {profile.gender}</p>
      <p className="profile-content-bio">Activities:</p>
      <p className="profile-content-bio">{profile.biography}</p>
    </div>
  );

  useEffect(() => {
    const getAuthUser = async () => {
      const response = await fetch("/dj-rest-auth/user/");
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      const data = await response.json();
      setAuthUser(data);
    };
    getAuthUser();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0]; // set file
    setFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result); // set preview 
    };

    reader.readAsDataURL(file);
    console.log(file);
  };

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  useEffect(() => {
    const getUserStories = async () => {
      const response = await fetch(`/api_v1/user_stories/`);
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      const data = await response.json();
      setUserStories(data);
    };
    getUserStories();


    const getStoriesInterval = setInterval(getUserStories, 3000);
    return () => {
      clearInterval(getStoriesInterval);
    };
  }, []);
  
  // const userFeedHTML = 
  
  // userStories.map((post) => (
  //   <Post
  //     {...post}
  //     author={post.author}
  //     showFullText={showFullText}
  //     toggleText={toggleText}
  //     timelineId = {timelineId}
  //   />
  // ));

  const userFeedHTML = userStories
        .map((post) => (
        <Post
          {...post}
          author={post.author}
          showFullText={showFullText}
          toggleText={toggleText}
          timelineId = {timelineId}
        />
      ));
    
  
  // const userFeedHTML = (post) => {
  //   if (userStories.length === 0) {
  //         return <div>Is loading ...</div>;
  //       } else { 
  //       return userStories
  //       .map((post) => (
  //       <Post
  //         {...post}
  //         author={post.author}
  //         showFullText={showFullText}
  //         toggleText={toggleText}
  //         timelineId = {timelineId}
  //       />
  //     ));
  //   }
  // }

//   const userFeedHTML = (post) => {
//     if (userStories.length === 0) {
//       return <div>Is loading ...</div>;
//     } else {
//     userStories.filter((post) => post.author === user).map((post) => (
//       <Post
//         {...post}
//         showFullText={showFullText}
//         toggleText={toggleText}
//         timelineId = {timelineId}
//       />
//     ));
//     }
// }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", file);
    formData.append("text", newPost);
    // formData.append("author", authUser.pk);
    formData.append("timeline", timelineId);
    // console.log(formData);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/stories/", options);
    const data = await response.json();
    setNewPost("");
    setPreview("")
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <Container>
        <Row>
          <Col className="profile-top">
          {/* <div className="profile-banner"></div> */}
            {/* <h1>{authUser.username}</h1> */}
            {/* {filterUser} */}
            <ProfileFeed {...profile} />
       
            {isMobile && (
              <div className="profile-nav">
                <Button onClick={() => setActiveCard("bio")}>Bio</Button>
                <Button onClick={() => setActiveCard("pictures")}>
                  Pictures
                </Button>
                <Button onClick={() => setActiveCard("createNew")}>
                  Create New Post
                </Button>
                <Button onClick={() => setActiveCard("posts")}>
                  Your Posts
                </Button>
              </div>
            )}
          </Col>
        </Row>

        {isMobile && (
          <Row>
            <Col className="mobile-profile-container">
              <>
                {activeCard === "bio" && (
                  <Card  id="bio-display" className="profile-left-side">
                    <h2 className="profile-header">Bio</h2>
                    {bioHTML}
                  </Card>
                )}
                {activeCard === "pictures" && (
                  <Card id="picture-display" className="profile-left-side">
                    <h2 className="profile-header">Pictures</h2>
                    <p className="profile-content">img 1</p>
                    <p className="profile-content">img 2</p>
                    <p className="profile-content">img 3</p>
                  </Card>
                )}
                {activeCard === "createNew" && (
                  <Card id="new-post" className="new-post-card">
                    <h2 className="profile-header">Create New Post</h2>
                    <form className="profile-content" onSubmit={handleSubmit}>
                      {/* ------------- image preview div ------------ */}
                      {preview && (
                      <div className="center-preview">
                        <img className="preview-image" src={preview} height="100" />
                      </div>
                      )}

                      {/* ------------------ form div ----------------- */}
                      <Form.Group className="mb-3" controlId="new-post-textarea">
                        <Form.Label style={{display: 'none'}}>
                          for later?
                        </Form.Label>

                      {/* ------------------- textarea ------------------- */}
                        <Form.Control 
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        as="textarea" rows={2} 
                        />
                      </Form.Group>

                      {/* ---------------- UPLOAD A FILE BUTTON ------------ */}
                      <div id="post-button-container">
                        <label 
                        htmlFor="file-upload" 
                        style={{backgroundColor: '#CACACA' }} 
                        className="btn"
                        id="send-button"
                        >
                          <FontAwesomeIcon icon={faMountainSun} /> Upload a file
                        </label>
                        <input
                          id="file-upload"
                          className="file-input"
                          type="file"
                          onChange={handleImage}
                          style={{display: 'none'}}
                        />
                      <Button type="submit" id="send-button" size="medium">
                        Post
                      </Button>
                      </div>
                      </form>



                  </Card>
                )}
                {activeCard === "posts" && <>{userFeedHTML}</>}
              </>
            </Col>
          </Row>
        )}

        {!isMobile && (
          <Row className="profile-mid">
            <Col>
              <Card id="bio-display" className="profile-left-side">
                <h2 className="profile-header">Bio</h2>
                {bioHTML}
              
                {/* <p className="profile-content">about text</p>
                <p className="profile-content">location</p> */}
              </Card>
              <Card id="picture-display" className="profile-left-side">
                <h2 className="profile-header">Pictures</h2>
                <p className="profile-content">img 1</p>
                <p className="profile-content">img 2</p>
                <p className="profile-content">img 3</p>
              </Card>
            </Col>
            <Col>
              <Card id="new-post" className="new-post-card">
                <h2 className="profile-header">Create New Post</h2>
                <form className="profile-content" onSubmit={handleSubmit}>

                  {/* ---------- image preview div ------------ */}
                  {preview && (
                  <div className="center-preview">
                    <img className="preview-image" src={preview} height="100" />
                  </div>
                  )}

                  <div class="upload-btn-wrapper">
                  </div>
                  <Form.Group className="mb-3" controlId="new-post-textarea">
                    <Form.Label style={{display: 'none'}}>
                      for later?
                    </Form.Label>
                    <Form.Control 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    as="textarea" rows={2} 
                    />
                  </Form.Group>
                  <div id="post-button-container">
                    <label 
                    htmlFor="file-upload" 
                    style={{backgroundColor: '#CACACA' }} 
                    className="btn"
                    id="send-button"
                    >
                      <FontAwesomeIcon icon={faMountainSun} /> Upload a file
                    </label>
                    <input
                      id="file-upload"
                      className="file-input"
                      type="file"
                      onChange={handleImage}
                      style={{display: 'none'}}
                    />
                    
                  <Button type="submit" id="send-button" size="medium">
                    Post
                  </Button>
                  </div>
                </form>
              </Card>
              {userFeedHTML}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default UserFeed;
