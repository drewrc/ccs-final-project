import Message from "../components/Message";
import { useState, useEffect, componentWillUnmount, useContext } from "react";
import { useMediaQuery } from '@mui/material'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { TextField, Button } from "@mui/material";
import Conversation from "../components/Conversation";
import Cookies from "js-cookie";
import MessageFriendProfile from "../components/MessageUserProfile";
import { faAnglesLeft, faArrowPointer, faCheckDouble, faCircleQuestion, faCircleXmark, faHandPointLeft, faRectangleXmark, faSmileWink, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SlidingPanel from "react-sliding-side-panel";
import { useSwipeable } from "react-swipeable";
import { useSprings } from "@react-spring/web";
import shadows from "@mui/material/styles/shadows";
import { borderRadius } from "@mui/system";
import { AuthContext } from "../auth/auth-context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useLottie } from "lottie-react";
import animationData from "../auth/auth-context/spinner/14592-loader-cat.json";

function UserMessages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState([]);
  const [currentFriendProfile, setCurrentFriendProfile] = useState(null);
  const [openPanel, setOpenPanel] = useState(false);
  const [panelType, setPanelType] = useState("left");
  const [panelSize, setPanelSize] = useState(100);
  const [noBackdrop, setNoBackdrop] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [showModal, setShowModal] = useState(false);
  

  const { userID } = useContext(AuthContext);
  const username = userID.username;
  const isMobile = useMediaQuery("(max-width:600px)");

  React.useEffect(() => {
    document.body.style.background = 'linear-gradient(217deg, rgba(255, 0, 98, 0.2), rgb(255, 158, 61, 0.3))'
  }, []);

  useEffect(() => {
    const getFriendProfile = async () => {
      const response = await fetch(`/api_v1/profiles/${selectedConversation}/`);
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      const data = await response.json();
      setCurrentFriendProfile(data);
    };
    if (selectedConversation) {
      getFriendProfile();
    }
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

    const getMessagesInterval = setInterval(getMessages, 30000);

    return () => {
      clearInterval(currentFriendProfile);
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
      setFriends(data.buddies);
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


//sets message.is_read to 'read' when it renders 
useEffect(() => {
  if (!message.is_read) {
    handleReadMessage();
  }
}, [message]);

const handleReadMessage = async () => {
  await updateRead(message.id);
  setMessage({...message, is_read: true});
}

  const updateRead = async (message_id) => {
    const response = await fetch(`/read_messages/${message_id}/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    })
    if (!response.ok) {
      throw new Error('Network response not OK');
    }
  }

  const handleDeleteFriend = async (id) => {
    const response = await fetch(`/api_v1/buddies_detail/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ buddy_id: id }),
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    toast.success("Friend deleted");
  };

  // console.log({messages})
  

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
      <div 
      key={message.id}>
        <div
          className={
            message.sender === authUser.pk
              ? " user-message"
              : " incoming-message"
          }
        >
          <Message {...message} 
          username ={username}
          handleDelete={() => handleDelete(message.id)} />
        </div>
        <div
          className={
            message.sender === authUser.pk ? "triangle-right" : "triangle-left"
          }
        ></div>
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
        {message.sender === authUser.pk && (
        <>{message.is_read ? 'seen ' : 'not seen '}
        <FontAwesomeIcon icon={faCheckDouble} />
        </>)}
        </div>
      </div>
    ));

  const friendsHTML = friends?.map((friend) => (
    <>
      <button
        key={friend.id}
        id="button"
        className="button-orange"
        onClick={() => {
          setSelectedConversation(friend.profile.user);
          setOpenPanel(true);
        }}
      >
        {isMobile ? (
          <img className="friend-list-img" src={friend.profile.profile_pic} />
        ) : (
          <p>{friend.profile.username}</p>
        )}
      </button>
    </>
  ));

  const selectedFriend = friends?.filter(
    (friend) => friend.profile.user === selectedConversation
  );

  const friendProfileHTML = selectedFriend?.map((friend) => (
    <>
      <div id="profile-hover" className="card-bg">
        <div
          className="profile-banner-tinder-card"
        >
          <img
            style={{ borderRadius: "10px 10px 0 0" }}
            className="profile-banner-display-tinder-card"
            src={friend.profile.profile_banner}
            width="100%"
            height="50%"
          />
          <div className="profile-pic-container-tinder-card">
            <img
              className="profile-pic-tinder-card"
              src={friend.profile.profile_pic}
            />
          </div>
          <div className="tinder-card-info">
            <h2 className="tinder-username"
            style={{ textTransform: 'capitalize'}}
            >{friend.profile.username}</h2>
            <p
          
            >{friend.profile.pronouns}</p>
            <p
            className="profile-location"
              style={{ textTransform: 'capitalize'}}
            >{friend.profile.gym_location}</p>
            <p>
              <button
                onClick={() => handleDeleteFriend(friend.profile.user)}
                style={{
                  marginBottom: "20px",
                }}
              >
                remove {friend.profile.username} as friend?
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  ));

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
    const response2 = await fetch(
      `/api_v1/send-message/${selectedConversation}/`,
      options
    );
    const data2 = await response2.json();
  };

  function showWarning() {
    setShowModal(true);
  }
  
  function hideModal() {
    setShowModal(false);
  }
  
  
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
    <>
      <ToastContainer />
      <Container
        fluid
        className="message-container"
        style={{
          backgroundColor: "rgba(298, 133, 239, 0.1)",
          background:
            "linear-gradient(217deg, rgba(255, 0, 98, 0.1), rgb(255, 158, 61, 0.2) )",
          marginTop: "-15px",
          width: "100vw",
          position: "relative",
        }}
      >
        <Row
          className="span-message-page"
          style={
            {
              // width: '100vw',
              // backgroundColor: 'rgba(298, 133, 239, 0.1)',
            }
          }
        >
          <Col
            style={{
              
              background:
                "linear-gradient(140deg, rgba(245, 253, 251, 0.8), rgba(255, 205, 252, 0.1))",
              // backgroundColor: 'rgba(0, 130, 255, 0.9)',
              boxShadow: "1px 5px 10px rgba(0, 0, 255, 0.2)",
              background:
                "linear-gradient(217deg, rgba(255,255,255,.9), rgba(255,255,255,0.5) 70.71%), linear-gradient(180deg, rgba(230,250,255,1), rgba(190, 255, 255, 0.2) 70.71%), linear-gradient(336deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 6, 0.1) 70.71%)",
            }}
            xs={3}
            className="friends-column"
          >
            <div 
            style={{ 
              background: 'linear-gradient(217deg, rgba(243, 185, 209, 0.2), rgba(248, 158, 73, 0.2) 70.71%), linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1) 70.71%), linear-gradient(336deg, rgba(0, 51, 255, 0.2), rgba(234, 234, 35, 0.1) 70.71%)', }}
            className="conversations-side-bar">
              <h3 
              style={{
                color: 'rgb(205, 46, 2)',
              }}
              className="friends-list-header">Buddies List</h3>
              {friends.length ? (
                friendsHTML
              ) : (
                <p 
                style={{
                  width: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                id="no-friends">
                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button 
                  id="friend-list-help"
                  onClick={showWarning}>What is this <FontAwesomeIcon icon={faCircleQuestion} /></button>
                </div>

                  <Modal show={showModal} onHide={hideModal}>
      
                  <Modal.Body
                  id="no-friends-yet"
                  style={{
                    paddingTop: '15%',
                    textAlign: 'center',
                  }}
                  >
                    <p>You have no friends, yet... </p>
                      <p>Start adding friends to see their profiles!</p>
                      <p>
                      <Link 
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                      id="user-match-link"
                      to="/user-match"> Click Here</Link> <FontAwesomeIcon icon={faArrowPointer} /></p>
                      <p>To make new buddies! </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <button 
                         id="close-button"
                         onClick={hideModal}>
                    <FontAwesomeIcon 
               
                    icon={faRectangleXmark} />
                    </button>
                  </Modal.Footer>
                </Modal>

                </p>
              )}
              <div></div>
            </div>
          </Col>
          <Col xs={9}>
          
            <div className="message-card">
              {!selectedConversation && messageHTML.length < 1 && (
                <div 
                style={{
                color: 'rgb(205, 46, 2)',
                background: 'linear-gradient(217deg, rgba(243, 185, 209, 0.3), rgba(248, 158, 73, 0.1) 70.71%), linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1) 70.71%), linear-gradient(336deg, rgba(0, 51, 255, 0.2), rgba(234, 234, 35, 0.1) 70.71%)', }}
                className={`no-message ${!openPanel ? 'no-message-fx' : ''} ${openPanel ? 'no-message-fx-2' : ''}`}>
                <FontAwesomeIcon icon={faArrowPointer} /> Select a friend to send a message!
                </div>
              )}
              <SlidingPanel
                type={panelType}
                isOpen={openPanel}
                backdropClicked={() => setOpenPanel(false)}
                size={panelSize}
                panelClassName={`additional-class ${
                  openPanel ? "slide-in" : ""
                } ${!openPanel ? "slide-out" : ""}`}
                noBackdrop={noBackdrop}
              >
                <div>
          
                
                  <Row>
                    <Col xs={12}>

                    
              
                      <div
                        style={{
                          // height: '60vh',
                          marginBottom: "50px",
                          // paddingTop: '20px',
                          // border: '1px solid black',
                          boxShadow: "1px 1px 10px rgba(0, 0, 255, 0.5)",
                        }}
                        className="message-panel-parent"
                      >
                        <button
                          id="toggle-profile"
                          onClick={() => setShowUserInfo(!showUserInfo)}
                        >
                          View User Profile
                        </button>
                        {showUserInfo ? (
                          <div
                            style={{
                              background:
                                "linear-gradient(217deg, rgba(255,255,255,.9), rgba(255,255,255,0.5) 70.71%), linear-gradient(180deg, rgba(230,250,255,0.8), rgba(255, 255, 255, 0.8) 70.71%), linear-gradient(336deg, rgba(130, 255, 255, 0.8), rgba(255, 255, 130, 1) 70.71%)",
                              // background: 'linear-gradient(140deg, rgba(245, 253, 251, 0.8), rgba(255, 205, 252, 0.1))',
                            }}
                            id="message-parent"
                            className={`slide ${
                              showUserInfo ? "slide-in" : ""
                            } ${!showUserInfo ? "slide-out" : ""}`}
                          >
                            <button
                              id="message-close"
                              onClick={() => {
                                setOpenPanel(false);
                                setSelectedConversation(null);
                              }}
                              className={!openPanel ? "slide-out" : ""}
                            >
                              <FontAwesomeIcon icon={faX} />
                            </button>

                            <h3 className="messages-header">
                              Messages with {currentFriendProfile?.username}
                            </h3>
                            {selectedConversation && (
                              <div className="conversation-box">
                                {messageHTML.length < 1 ? (
                                  <div className="no-message-message">
                                   <p> no messages yet... </p>
                                    <p>
                                      why don't you send a
                                    message first? 
                                    <FontAwesomeIcon icon={faSmileWink} />
                                    </p>
                                  </div>
                                ) : (
                                  <div>{messageHTML}</div>
                                )}
                              </div>
                            )}
                           

                            <Col className="message-form">
                              <form onSubmit={handleSubmit}>
                                <TextField
                                  label="Message"
                                  id="outlined-multiline-flexible"
                                  multiline
                                  maxRows={4}
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  style={{ width: "70%", marginBottom: "30px" }}
                                  className="textField"
                                />
                                <button
                                  style={{
                                    width: "20%",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                    marginTop: "5px",
                                  }}
                                  type="submit"
                                  id="send-button"
                                  class="button_fill "
                                >
                                  send
                                </button>
                              </form>
                            </Col>
                          </div>
                        ) : (
                          <Col className="unknown">
                            <div
                              className={`user-info-card ${
                                !showUserInfo ? "slide-in" : ""
                              } ${showUserInfo ? "slide-out" : ""}`}
                            >
                              <h3 
                              style={{
                                padding: '20px'
                              }}
                              className='infoText'>User info</h3>
                              {friendProfileHTML}
                            </div>
                          </Col>
                        )}
                      </div>
                      
                    </Col>
                  </Row>
                </div>
              </SlidingPanel>
              <div
                id='warning-message-spinner'
              >
                  {View}
                  <p
                  id="no-message-warning"
                  >
                    Looks like you don't have any messages yet!
                  </p>
                </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserMessages;
