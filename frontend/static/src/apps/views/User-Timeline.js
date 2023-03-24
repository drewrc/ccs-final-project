import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Container from "react-bootstrap/esm/Container"
import { useState, useEffect } from "react"
import Post from "../components/Post"
import Cookies from "js-cookie"
import React from "react"
import { Card } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMountain, faMountainSun } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
import NewPost from "../components/NewPost"
import { useLottie } from "lottie-react";
import animationData from "../auth/auth-context/spinner/14592-loader-cat.json";
import Slider from 'react-slick';
// import "../styles/slick/slick.css";
// import "../static/slick/slick-theme.css";



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

       const lottieCat = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    
      const { View } = useLottie(lottieCat);

    return (
        <div
        style={{
          width: '100vw',
          height: '100vh',
        
        }}
        >
            <Container
            style={{
              width: '100%',
            }}
            >
              <Row
              style={{
                marginBottom: '5%',
              }}
              className="timeline-container"
              >
                <Col>
                <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
              
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }}
                id="user-stories-div"
                >
                  <p
                  style={{padding: '10%'}}
                  >
                    {stories.length > 6 ? (
                      <Slider
                        dots={true}
                        infinite={true}
                        speed={500}
                        slidesToShow={5}
                        slidesToScroll={5}
                      >
                        {stories.map((post) => (
                          <img src={post.img} alt={post.name} />
                        ))}
                      </Slider>
                    ) : (
                      <div class="image-container">
                        {stories.map((post) => (
                          <img src={post.img} alt={post.name} />
                        ))}
                      </div>
                    )}

                  </p>
                </div>
                </Col>
              </Row>
                <Row
                className="timeline-container"
                >
                    <Col 
                    // className="middle-column-posts"
                  >
                    <div 
                    className="center-posts"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    >
                    <div 
                      style={{
                        width: '100%',
                        padding:'5%',
                      }}>
                        <NewPost />
                        {stories.length > 0 ? storiesHTML : 
                        <div
                        style={{
                          borderRadius: '10px',
                          marginBottom: '10%',
                        }}
                        id="oh-no-stories"
                       >
                          <p>No stories right now to view...</p>
                           <p>
                            {View}
                           </p>
                          <p>Check back later!</p>
                          </div>}
                      </div>
                      
                      </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserTimeline