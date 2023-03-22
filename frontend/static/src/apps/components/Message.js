import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { TextField } from '@mui/material';
import { AuthContext } from '../auth/auth-context/AuthContext';

function Message ({conversation, text, id, user_from, user_to, sender, receiver, date_created, handleDelete, username }) {
    const [editMode, setEditMode] = useState(false);
    const [editText, setEditText] = useState(text);

    const handleEdit = async () => {
        const formData = new FormData();
        formData.append('text', editText);
        formData.append('conversation', 1);
        formData.append('receiver', receiver)
        formData.append('sender', sender)
      const options = {
        method: "PUT",
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: formData,
      };
      
      const response = await fetch(`/api_v1/messages/${id}/`, options);
      const data = await response.json();
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setEditText(text);
    };
    const handleSaveClick = () => {
        handleEdit();
        setEditMode(false);
      };
    
    const handleChange = (event) => {
        setEditText(event.target.value);
     };


     const editHTML = user_from === username && (
      <>
        <p className="trash-button">
          <button 
            onClick={handleEditClick}
            className="trash-button" 
            type="submit">
            <FontAwesomeIcon 
              style={{
                color: 'white', 
              }}
              icon={faPencil} />
          </button>
          <button 
            onClick={handleDelete}
            className="trash-button" 
            type="submit">
            <FontAwesomeIcon 
              style={{
                color: 'white', 
              }}
              icon={faTrash} />
          </button>
        </p>
      </>
    );
  
  
         
    return (
        <div>
        <p className="sender-message-object">Sender: {user_from}</p>
            {editMode ? (
            <span id='edit-message-object'>
                <div className='edit-form'>
                <TextField 
                className='edit-message-form'
                label="Message"
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}  
                value={editText} 
                onChange={handleChange} />
                </div>
                <div id='edit-buttons'>
                <button 
                className="trash-button"
                onClick={handleSaveClick}>
                <FontAwesomeIcon icon={faFloppyDisk} 
                style={{
                    color: 'white', 
                  }}
                  />
                </button>
                <button 
                className="trash-button"
                onClick={handleCancelClick}
                >
                <FontAwesomeIcon 
                style={{
                    color: 'white', 
                  }}
                icon={faTrash} />
                </button>
                </div>
            </span>
            ):(
            <div>
            <p>{text}</p>
            {editHTML}
            </div>
            )}
        </div>
    );
};

export default Message