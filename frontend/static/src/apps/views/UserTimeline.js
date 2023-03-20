import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Container from "react-bootstrap/esm/Container"
import { useState, useEffect } from "react"
import Post from "../components/Post"

function UserTimeline () {
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

       const storiesHTML = stories.map((post) =>
       <>
       <Post {...post}/>
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