import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Container from "react-bootstrap/esm/Container"
import { useState, useEffect } from "react"
import Post from "../components/Post"
import Cookies from "js-cookie"
import React from "react"

function UserTimeline () {

  React.useEffect(() => {
    document.body.style.background = 'linear-gradient(217deg, rgba(255, 0, 98, 0.2), rgb(255, 158, 61, 0.3))'
  }, []);

    const [ stories, setStories ] = useState([])
    useEffect(() => {
        const getStories = async () => {
          const response = await fetch(`/api_v1/friend_stories/`);
          if (!response.ok) {
            throw new Error("Network response not OK");
          }
          const data = await response.json();
          setStories(data);
        };
        getStories();
      }, []);

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
      //stories/<int:pk>/like/

       const storiesHTML = stories.map((post) =>
       <>
       <Post 
       {...post}
       handleLike={handleLike}
       />
       </>
       )

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={2}>
                    </Col>
                    <Col xs={8}>
                    <h1>
                        Friends Posts! 
                    </h1>
                        {storiesHTML}
                    </Col>
                    <Col xs={2}>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserTimeline