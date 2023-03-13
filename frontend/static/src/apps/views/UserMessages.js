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

function UserMessages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState([]);

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
      const response = await fetch(`/api_v1/buddies_list/`);
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
        <div class="triangle"></div>
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
      <button class="button" 
      onClick={() => setSelectedConversation(friend.id)}
      >
        <span>
          <Conversation {...friend} />
        </span>
      </button>
    </div>
  ));

  const friendProfileHTML = selectedProfile.map((profile) => (
    <div>
      <MessageFriendProfile {...profile} />
    </div>
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
    // Send the message to the conversation
    const response = await fetch("/api_v1/messages/", options);
    const data = await response.json();

    // Send the message to the specific user
    const response2 = await fetch(`/api_v1/send-message/${selectedConversation}/`, options);
    const data2 = await response2.json();

    setMessage("");
  };

  return (
    <>
      <Container className="message-container">
        <Row className="span-message-page">
          <Col md={3}>
            <div className="conversations-side-bar">
              <h3>Friends List</h3>
              {friendsHTML}
            </div>
          </Col>
          <Col md={6}>
            <div className="message-card">
              <h3>Messages</h3>
              {selectedConversation && (
                <h4>Conversation with {selectedConversation}</h4>
              )}
              {messageHTML}
            </div>
          </Col>
          <Col md={3}>
            <div className="user-info-card">
              <h3>User info</h3>
              {friendProfileHTML}
            </div>
          </Col>
        </Row>
        <Row>
          <Col></Col>
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
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default UserMessages;
