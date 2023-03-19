import Message from "../components/Message";
import { useState, useEffect, componentWillUnmount } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { TextField, Button } from "@mui/material";
import Conversation from "../components/Conversation";
import Cookies from "js-cookie";
import MessageFriendProfile from "../components/MessageUserProfile";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SlidingPanel from 'react-sliding-side-panel';
import {useSwipeable} from 'react-swipeable';
import { useSprings } from '@react-spring/web'


function UserMessages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState([]);
  const [currentFriendProfile, setCurrentFriendProfile] = useState([])
  const [openPanel, setOpenPanel] = useState(false);
  const [panelType, setPanelType] = useState('left');
  const [panelSize, setPanelSize] = useState(100);
  const [noBackdrop, setNoBackdrop] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(true);
 

  useEffect(() => {
    const getFriendProfile = async () => {
      const response = await fetch(`/api_v1/profiles/${selectedConversation}`);
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      const data = await response.json();
      setCurrentFriendProfile(data);
    };
    getFriendProfile();
  })

console.log({selectedConversation})
  //fetch to display current selected friend profile data (right side)
  useEffect(() => {
    const getFriendProfile = async () => {
      const response = await fetch(`/api_v1/users/${selectedConversation}/`);
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      const data = await response.json();
      setSelectedProfile([data]);
    };
    getFriendProfile();
  }, [selectedConversation]);

  //fetch current authenticated user
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

  //fetch messages array
  useEffect(() => {
    const getMessages = async (interval) => {
      const response = await fetch(`/api_v1/messages/`);
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      const data = await response.json();
      setMessages(data);
    };
    getMessages();

    const getMessagesInterval = setInterval(getMessages, 3000);

    return () => {
      clearInterval(getMessagesInterval);
    };
  }, []);
  
  //fetch user friends
  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(`/api_v1/buddies_detail/`);
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      const data = await response.json();
      setFriends(data);
    };
    getFriends();
  }, []);


  //send DELETE request for delete button on each message
  const handleDelete = async (id) => {
    const response = await fetch(`/api_v1/messages/${id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    // Remove the deleted message from the local state
    setMessage(message.filter((message) => message.id !== id));
  };


  // filter messages based on whether *SENDER id* and *RECEIVER id* matches *authUser.pk*
  // or *selected friend* using the state value of 'selectedConversation'
  const messageHTML = messages
    .filter((message) => {
      if (selectedConversation) {
        return (
          (message.sender === authUser.pk &&
            message.receiver === selectedConversation) ||
          (message.sender === selectedConversation &&
            message.receiver === authUser.pk)
        );
      } else {
        return false;
      }
    })
    .map((message) => (
      <div key={message.id}>
        <div className="message-object">
          <Message {...message} 
          handleDelete={() => handleDelete(message.id)} 
          />
        </div>
        <div className={message.sender === authUser.pk ? "triangle-right" : "triangle-left"}></div>
        <div id="message-date">
          Sent:{" "}
          {(() => {
            const date = new Date(message.date_created);
            const formattedDate = `${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear().toString().substr(-2)}`;
            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
            const formattedDateTime = `${formattedDate} ${formattedTime}`;
            return formattedDateTime;
          })()}
        </div>
        <div id="read-message">
          read?
          <FontAwesomeIcon icon={faCheckDouble} />
        </div>
      </div>
    ));



  const friendsHTML = friends.map((friend) => (
    <div key={friend.id}>
        <button 
            id="button" 
            className="button-orange"
            onClick={() => {
            setSelectedConversation(friend.to_user_id);
            setOpenPanel(true);
          }}>
            {friend.to_user_id}
          {friend.to_user}
      </button>
    </div>
  ));

  const friendProfileHTML = (
    <>
        <div className="profile-card-messages">
        <div className="profile-banner-tinder-card">
        <img className="profile-banner-display-tinder-card" src={currentFriendProfile.profile_banner} width="100%" height='50%'  />
        <div className="profile-pic-container-tinder-card">
            <img className="profile-pic-tinder-card" src={currentFriendProfile.profile_pic} />
        </div>
        <div className="tinder-card-info">
        <h2 className="tinder-username">{currentFriendProfile.username}</h2>
        <p>{currentFriendProfile.pronouns}</p>
        <p>{currentFriendProfile.gym_location}</p>
          
        </div>
        </div>
        </div>
    </>
  );


  console.log({currentFriendProfile})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", message);
    formData.append("sender", authUser.pk);
    formData.append("receiver", selectedConversation);
    formData.append("conversation", 1);
    formData.append("message", message);
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    setMessage("");
    // Send the message to the conversation
    const response = await fetch("/api_v1/messages/", options);
    const data = await response.json();

    // Send the message to the # phone user
    const response2 = await fetch(`/api_v1/send-message/${selectedConversation}/`, options);
    const data2 = await response2.json();
  };



  // const [springs, api] = useSprings(4, () => ({ x: 0 }))

  // const bind = useDrag(
  //   ({ down, movement: [x], args: [index] }) => api.start((i) => i === index && { x: down ? x : 0 }),
  //   {
  //     axis: 'x'
  //   }
  // )

  // const config = {
  //   delta: 10, // minimum distance (in px) before a swipe is detected
  //   preventDefaultTouchmoveEvent: true, // prevent scrolling when swiping
  //   trackTouch: true, // track touch movements
  //   trackMouse: false, // track mouse movements
  // };

  // const handlers = useSwipeable({
  //   onSwiped: (eventData) => console.log("User Swiped!", eventData),
  //   ...config,
  // });


  return (
    <>
      <Container 
      fluid
      className="message-container"
        style={{
          backgroundColor: '#EEEEEE',
          padding: '30px',
          marginTop: '-15px',
          width: '100vw',
          position: 'relative',
        }}
      >
        <Row className="span-message-page"
        
        >
          <Col 
          xs={4}
          className="friends-column"
          >
            <div className='conversations-side-bar'
              >
              <h3 className="friends-list-header">Friends</h3>
              {friends ? (
                friendsHTML
              ) : (
                <p>You have no friends. Start adding friends to see their profiles.</p>
              )}
                  <div>
                  </div>
            </div>
          </Col>
        
          <Col xs={8}>
            <div className="message-card">
            <SlidingPanel
                  type={panelType}
                  isOpen={openPanel}
                  backdropClicked={() => setOpenPanel(false)}
                  size={panelSize}
                  panelClassName={`additional-class ${openPanel ? 'slide-in' : ''} ${!openPanel ? 'slide-out' : ''}`}
                  noBackdrop={noBackdrop}
                >
                  <div >
                  <Row>
                    <Col xs={10}>
                    <div>

                    {showUserInfo ? (
                            <div className={`slide ${showUserInfo ? 'slide-in' : ''} ${!showUserInfo ? 'slide-out' : ''}`}>
                              <h3>Messages</h3>
                              {selectedConversation && (
                                <h4>Conversation with {selectedConversation}</h4>
                              )}
                              {selectedConversation ? (
                                messageHTML
                              ) : (
                                <p>Choose a conversation on the left to start talking to friends!</p>
                              )}
                              <button onClick={() => setOpenPanel(false)} className={!openPanel ? 'slide-out' : ''}>
                                close</button>
                              <Col className="message-form">
                                <form onSubmit={handleSubmit}>
                                  <TextField
                                    label="Message"
                                    id="outlined-multiline-flexible"
                                    multiline
                                    maxRows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                  />
                                  <Button type="submit" id="send-button" size="medium">
                                    Send
                                  </Button>
                                </form>
                              </Col>
                            </div>
                          ) : (
                            <Col className="unknown">
                              <div className={`user-info-card ${!showUserInfo ? 'slide-in' : ''} ${showUserInfo ? 'slide-out' : ''}`}>
                                <h3>User info</h3>
                                {friendProfileHTML}
                              </div>
                            </Col>
                          )}
                           <button onClick={() => setShowUserInfo(!showUserInfo)}>
                        View User Profile
                      </button>
                      </div> 
                      </Col>
                    </Row>
                  </div>
                </SlidingPanel>
                </div>
          </Col>
        </Row>
      
      </Container>
    </>
  );
}

export default UserMessages;
