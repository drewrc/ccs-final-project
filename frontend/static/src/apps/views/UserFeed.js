import Post from "../components/Post";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Card } from "@mui/material";
import { TextField, Button } from "@mui/material";
import Cookies from "js-cookie";

function UserFeed() {
  const [userStories, setUserStories ] = useState ([])
  const [showFullText, setShowFullText] = useState(false);
  const [newPost, setNewPost]= useState("")
  const [file, setFile] = useState();
  const [authUser, setAuthUser] = useState("")

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
    setFile({
      ...file,
      img: file
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(file);
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

  return (
    <div>
      <Container>
        <Row>
          <Col>
          <div className="profile-banner"></div>
          <h1>Name</h1>
            Profile component goes here! 
          </Col>
        </Row>
        <Row>
          <Col>
          <Card>
            <h2>Bio</h2>
            <p>gender</p>
            <p>about text</p>
            <p>location</p>
          </Card>
          <Card>
            <h2>Pictures</h2>
            <p>img 1</p>
            <p>img 2</p>
            <p>img 3</p>
          </Card>
          </Col>
          <Col>
            <Card>
              <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
            <img className="preview-image" src={file} height="300"/>
              <input type="file" onChange={handleImage} />
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
      </Container>
    </div>
  );
}

export default UserFeed;
