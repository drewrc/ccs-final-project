import Post from "../components/Post";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Card } from "@mui/material";
import { TextField, Button } from "@mui/material";
import Cookies from "js-cookie";
import { useMediaQuery } from '@mui/material'

function UserFeed() {
  const [userStories, setUserStories ] = useState ([])
  const [showFullText, setShowFullText] = useState(false);
  const [newPost, setNewPost]= useState("")
  const [file, setFile] = useState();
  const [authUser, setAuthUser] = useState("")
  const [activeCard, setActiveCard] = useState("posts")
  console.log({file})

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
    const file = e.target.files[0];
    setFile(file);
  

    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(file);
    console.log(file);
  };

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

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
      key={post.id}
      id={post.id}
      text={post.text}
      img={post.img}
      author={post.author}
      showFullText={showFullText}
      toggleText={toggleText}
    />
  ))

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", file);
    formData.append("text", newPost);
    formData.append("author", authUser.pk);
    console.log(formData);
    
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
  };

  const isMobile = useMediaQuery('(max-width:600px)'); 

  return (
    <div>
      <Container>
        <Row>
          <Col className="profile-top">
          <div className="profile-banner"></div>
          <h1>{authUser.username}</h1>
            Profile component goes here! 
              {isMobile && (
                    <div className="profile-nav">
                      <Button onClick={() => setActiveCard('bio')}>Bio</Button>
                      <Button onClick={() => setActiveCard('pictures')}>Pictures</Button>
                      <Button onClick={() => setActiveCard('createNew')}>Create New Post</Button>
                      <Button onClick={() => setActiveCard('posts')}>Your Posts</Button>
                    </div>
                  )}
          </Col>
        </Row>
        
            {isMobile && (
              <Row>
                <Col className="mobile-profile-container">
              <>
                {activeCard === "bio" && (
                  <Card className="profile-left-side">
                    <h2 className="profile-header">Bio</h2>
                    <p className="profile-content">gender</p>
                    <p className="profile-content">about text</p>
                    <p className="profile-content">location</p>
                  </Card>
                )}
                {activeCard === "pictures" && (
                  <Card className="profile-left-side">
                    <h2 className="profile-header">Pictures</h2>
                    <p className="profile-content">img 1</p>
                    <p className="profile-content">img 2</p>
                    <p className="profile-content">img 3</p>
                  </Card>
                )}
                {activeCard === "createNew" && (
                  <Card className="new-post-card">
                    <h2 className="profile-header">Create New Post</h2>
                    <form className="profile-content" onSubmit={handleSubmit} encType="multipart/form-data">
                      <img className="preview-image" src={file} height="100"/>
                      <input className='file-input' type="file" onChange={handleImage} />
                      <TextField
                        label="New Post"
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                      />
                      <Button type="submit" id="send-button" size="medium">
                        Post
                      </Button>
                    </form>
                  </Card>
                )}
                {activeCard === "posts" && (
                <>
                  {userFeedHTML}
                </>
                )}
              </>
              </Col>
              </Row>
            )}
      
      {!isMobile && (
        <Row className="profile-mid">
          <Col>
          <Card className="profile-left-side">
            <h2 className="profile-header">Bio</h2>
            <p className="profile-content">gender</p>
            <p className="profile-content">about text</p>
            <p className="profile-content">location</p>
          </Card>
          <Card className="profile-left-side">
            <h2 className="profile-header">Pictures</h2>
            <p className="profile-content">img 1</p>
            <p className="profile-content">img 2</p>
            <p className="profile-content">img 3</p>
          </Card>
          </Col>
          <Col>
            <Card className="new-post-card">
              <h2 className="profile-header">Create New Post</h2>
                <form className="profile-content" onSubmit={handleSubmit} encType="multipart/form-data">
                  <img className="preview-image" src={file} height="100"/>
                    <input className='file-input' type="file" onChange={handleImage} />
                      <TextField
                        label="New Post"
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                      />
                      <Button type="submit" id="send-button" size="medium">
                        Post
                      </Button>
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
