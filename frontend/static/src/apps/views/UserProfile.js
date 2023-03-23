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
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountainSun,
  faVideo,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ProfileFeed from "../components/Profile-feed";
import Form from "react-bootstrap/esm/Form";
import { AuthContext } from "../auth/auth-context/AuthContext";
import ProfileEditForm from "../components/ProfileEditForm";
import Spinner from "react-bootstrap/esm/Spinner";
import ProfileHelp from "../components/ProfileInfo";
import { textAlign } from "@mui/system";

function UserProfile() {
  const { isAuthenticated, userID } = useContext(AuthContext);

  React.useEffect(() => {
    document.body.style.background =
      "linear-gradient(217deg, rgba(255, 100, 98, 0.3), rgb(255, 158, 61, 0.8))";
  }, []);

  const [userStories, setUserStories] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [file, setFile] = useState();
  const [authUser, setAuthUser] = useState("");
  const [activeCard, setActiveCard] = useState("posts");
  const [timelineId, setTimelineId] = useState(null);
  const [preview, setPreview] = useState("");
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState(userID.username);

  const handleLike = async (id) => {
    const response = await fetch(`/api_v1/stories/${id}/like/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
  };
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
      const response = await fetch("/api_v1/current_user/");
      const data = await response.json();
      setProfile(data);
    };
    fetchUserProfile();
  }, []);
  console.log({ profile });

  // const filterUser = profile.user === userID.pk ? (
  //   <ProfileFeed {...profile} />
  // ) : null;
console.log({profile})


  const bioHTML = (
    <div key={profile.id}>
      <div
      style={{
              marginLeft: '2%',
              marginRight:'8%',
            }}
      >
      <p 
        style={{
          // borderBottom: '1px solid',
          marginLeft: '5%',
          marginRight:'5%',
          paddingTop: '2%',
        }}
      
      className="profile-content">
        Name: <span id="profile-text">{profile.first_name} {profile.last_name}</span>
      </p>
      <p 
        style={{
          // borderBottom: '1px solid',
          marginLeft: '5%',
          marginRight:'5%',
          paddingTop: '2%',
        }}
      className="profile-content">Location: <span id="profile-text">
        {profile.gym_location}  
        </span></p>
      <p 
            style={{
              // borderBottom: '1px solid rgba(189, 67, 7, 0.5)',
              // borderColor: 'rgb(189, 67, 7, 0.5) !important',
              marginLeft: '5%',
              marginRight:'5%',
              paddingTop: '2%',
            }}
      
      className="profile-content">
        Pronouns: <span id="profile-text"> {profile.pronouns}</span></p>
      <p 
      
      style={{
        // borderBottom: '1px solid',
        marginLeft: '5%',
        marginRight:'5%',
        paddingTop: '2%',
      }}
      className="profile-content">Gender:

      <span id="profile-text"> 
      {profile.gender} 
      </span>
      </p>
      <p   
      style={{
        // borderBottom: '1px solid',
        marginLeft: '5%',
        marginRight:'5%',
        paddingTop: '2%',
        paddingBottom: '1%',
        backgroundColor: 'rgba(232, 192, 152, 0.1)'

      }}    
      className="profile-content-bio">Preferred Activities: 
      <p
      style={{
        width: '90%',
        marginTop: '1%',
        marginBottom: '1%',
        marginLeft: '1%',
        marginRight: '50px',
        
      }}
      >
      <span id="profile-text" >{profile.activity_names}</span>
      </p>
      </p>
      <p
      style={{
        backgroundColor: 'rgba(232, 192, 152, 0.1)',
        paddingTop: '3%',
      }}
      className="profile-content-bio"> 
      <p>About:</p>
      <div 
      style={{
        
        width: '90%',
        marginBottom: '10%',
        marginLeft: '1%',
        marginRight: '1%',
        textAlign: 'center',
      }}
      id="bio-container">
      <span id="profile-text" >{profile.biography}</span>
     </div>
     </p>
     </div>
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

    //users/<int:pk>/

    const getStoriesInterval = setInterval(getUserStories, 300000);
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

  const userFeedHTML = userStories.map((post) => (
    <Post
      {...post}
      author={post.author}
      showFullText={showFullText}
      toggleText={toggleText}
      timelineId={timelineId}
      handleLike={handleLike}
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
    setPreview("");
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <Container
      id="profile-container-id"
      // style={{backgroundColor: 'black',}}
      >
        <Row>
          <Col className="profile-top">
            {/* <div className="profile-banner"></div> */}
            {/* <h1>{authUser.username}</h1> */}
            {/* {filterUser} */}
            {profile ? (
              <div className="profile-feed-container">
                <ProfileFeed {...profile} />
              </div>
            ) : (
              <div className="spinner-container">
                <Spinner animation="border" role="status" variant="primary">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )}

            {isMobile && (
              <div 
              className="profile-nav">
                <Button id="profile-nav-button" onClick={() => setActiveCard("bio")}>Profile</Button>
                <Button id="profile-nav-button" onClick={() => setActiveCard("pictures")}>
                  Media
                </Button>
                <Button id="profile-nav-button" onClick={() => setActiveCard("createNew")}>
                  New Post
                </Button>
                <Button id="profile-nav-button" onClick={() => setActiveCard("posts")}>
                  Archived
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
                  <Card 
                  style={{ background: 'linear-gradient(217deg, rgba(243, 185, 209, 0.3), rgba(248, 158, 73, 0.1) 70.71%), linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1) 70.71%), linear-gradient(336deg, rgba(0, 51, 255, 0.2), rgba(234, 234, 35, 0.1) 70.71%)', }}
                  id="bio-display" className="profile-left-side">
                    <h2 className="profile-header">Profile Settings
                    </h2>
                    <div style={{
                      position: 'absolute',
                      top: '3%',
                      right: '5%',
                    }}>
                    <ProfileHelp />
                    </div>
                    {bioHTML}
                    <p className="trash-button">
                      <ProfileEditForm
                      // onCancel={handleCancel}
                      />
                    </p>
                  </Card>
                )}
                {activeCard === "pictures" && (
                  <Card 
                  style={{ background: 'linear-gradient(217deg, rgba(243, 185, 209, 0.3), rgba(248, 158, 73, 0.1) 70.71%), linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1) 70.71%), linear-gradient(336deg, rgba(0, 51, 255, 0.2), rgba(234, 234, 35, 0.1) 70.71%)', }}
                  id="picture-display" className="profile-left-side">
                    <h2 className="profile-header">Media</h2>
                   {userStories.map((story, index) => (
                      <p 

                      id="profile-images" className="profile-content" >
                        <img
                          style={{
                            height: "40%",
                            width: "40%",
                          }}
                          key={index}
                          src={story.img}
                          alt={`User story ${index + 1}`}
                        />
                      </p>
                    ))}
                  </Card>
                )}
                {activeCard === "createNew" && (
                  <Card id="new-post" className="new-post-card">
                    <h2 className="profile-header">Create New Post</h2>
                    <form className="profile-content" onSubmit={handleSubmit}>
                      {/* ------------- image preview div ------------ */}
                      {preview && (
                        <div className="center-preview">
                          <img
                            className="preview-image"
                            src={preview}
                            height="100"
                          />
                        </div>
                      )}

                      {/* ------------------ form div ----------------- */}
                      <Form.Group
                        className="mb-3"
                        controlId="new-post-textarea"
                      >
                        <Form.Label style={{ display: "none" }}>
                          for later?
                        </Form.Label>

                        {/* ------------------- textarea ------------------- */}
                        <Form.Control
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          as="textarea"
                          rows={2}
                        />
                      </Form.Group>

                      {/* ---------------- UPLOAD A FILE BUTTON ------------ */}
                      <div id="post-button-container">
                        <label
                          htmlFor="file-upload"
                          style={{ backgroundColor: "#CACACA" }}
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
                          style={{ display: "none" }}
                        />
                        <Button type="submit" id="send-button" size="medium">
                          Post
                        </Button>
                      </div>
                    </form>
                  </Card>
                )}
                {activeCard === "posts" && <>
                
                <Carousel>
                {userFeedHTML.map((item, index) => (
                  <Carousel.Item key={index}>
                    {item}
                  </Carousel.Item>
                ))}
              </Carousel>
                
                </>}
              </>
            </Col>
          </Row>
        )}

        {!isMobile && (
          <Row className="profile-mid">
            <Col>
              <Card id="bio-display" className="profile-left-side">
                <h2 className="profile-header">Profile Settings</h2>
                <div style={{
                      position: 'absolute',
                      top: '3%',
                      right: '5%',
                    }}>
                    <ProfileHelp />
                    </div>
                {bioHTML}
                <p className="trash-button">
                  <ProfileEditForm />
                </p>
              </Card>
              <Card id="picture-display" className="profile-left-side">
                <h2 className="profile-header">Media</h2>
                {userStories.map((story, index) => (
                  <p 
                  style={{
                    paddingLeft: '5%',
                  }}
                  id="profile-images">
                    <img
                      style={{
                        height: "40%",
                        width: "40%",
                      }}
                      key={index}
                      src={story.img}
                      alt={`User story ${index + 1}`}
                    />
                  </p>
                ))}
              </Card>
            </Col>
            <Col>
              <Card id="new-post" className="new-post-card">
                <h2 className="profile-header">Create New Post</h2>
                <form className="profile-content" onSubmit={handleSubmit}>
                  {/* ---------- image preview div ------------ */}
                  {preview && (
                    <div className="center-preview">
                      <img
                        className="preview-image"
                        src={preview}
                        height="100"
                      />
                    </div>
                  )}

                  <div class="upload-btn-wrapper"></div>
                  <Form.Group className="mb-3" controlId="new-post-textarea">
                    <Form.Label style={{ display: "none" }}>
                      for later?
                    </Form.Label>
                    <Form.Control
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      as="textarea"
                      rows={2}
                    />
                  </Form.Group>
                  <div id="post-button-container">
                  <label
                    htmlFor="file-upload"
                    className="btn"
                    id="send-button"
                    style={{
                      
                      color: "#FFFFFF",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <FontAwesomeIcon icon={faMountainSun} style={{ marginRight: "10px" }} />
                    Upload a file
                  </label>
                  <input
                    id="file-upload"
                    className="file-input"
                    type="file"
                    onChange={handleImage}
                    style={{ display: "none" }}
                  />


                    <Button type="submit" id="send-button" size="medium">
                      Post
                    </Button>
                  </div>
                </form>
              </Card>
              <Carousel>
                {userFeedHTML.map((item, index) => (
                  <Carousel.Item key={index}>
                    {item}
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default UserProfile;
