import Message from "../components/Message";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { TextField, Button } from '@mui/material'
import Conversation from "../components/Conversation";


function UserMessages() {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch(`/api_v1/messages/`);
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      const data = await response.json();
      setMessages(data);
    };
    getMessages();
  }, []);

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(`/api_v1/buddies_list/`);
      if (!response.ok) {
        throw new Error("Network response not OK");
      }
      const data = await response.json();
      setConversations(data);
    };
    getFriends();
  }, []);

  console.log({conversations})

  const messageHTML = messages.map((message) => (
    <div > 
    <div className="message-object" key={message.id}>
      <Message {...message} />
      </div>
      <div class="triangle">
      </div>
    </div>
  ));
  const conversationHTML = conversations.map((conversation) => (
    <div > 
      <button class="button">
        <span><Conversation {...conversation} /> </span>
      </button>
    </div>
  ));

  return (
  <>
    <Container className="message-container">
      <Row className="span-message-page">
        <Col>
          <div className="conversations-side-bar">
            <h3>Friends List</h3>
            {conversationHTML}
          </div>
        </Col>
        <Col>
            <div className="message-card">
            <h3>Messages</h3>
              {messageHTML}
            </div>
        </Col>
        <Col>
          <div className="user-info-card">
            <h3>User info</h3>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
        <Col className="message-form">
        <TextField label="Message"
          id="outlined-multiline-flexible"
          multiline
          maxRows={4} />
        <Button id="send-button" size="medium">Send</Button>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  </>
    
  );
}

export default UserMessages;
