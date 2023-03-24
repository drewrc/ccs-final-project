import { useState, useEffect } from "react"
import Post from "../components/Post"
import Cookies from "js-cookie"
import React from "react"
import { Card } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMountain, faMountainSun } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
import Form from "react-bootstrap/esm/Form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NewPost() {
const [newPost, setNewPost] = useState("");
const [file, setFile] = useState();
const [timelineId, setTimelineId] = useState(null);
const [preview, setPreview] = useState("");



    const handleImage = (e) => {
        const file = e.target.files[0]; // set file
        setFile(file);
    
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setPreview(reader.result); // set preview
        };
    
        reader.readAsDataURL(file);
        console.log(file);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("img", file);
        formData.append("text", newPost);
        // formData.append("author", authUser.pk);
        formData.append("timeline", timelineId);
        // console.log(formData);
      
        const options = {
          method: "POST",
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
          body: formData,
        };
        const response = await fetch("/api_v1/stories/", options);
        const data = await response.json();
        if (response.ok) {
          setNewPost("");
          setPreview("");
          toast.success("Post submitted successfully");
        } else {
          toast.error("Error submitting post");
        }
      };
      
    




    return(
        <Card id="new-post" className="new-post-card">
        <h2 className="profile-header">Create New Post</h2>
        <ToastContainer />
        <form 
        style={{
          paddingLeft: '5%',
        }}
        onSubmit={handleSubmit}>
          {/* ---------- image preview div ------------ */}
          {preview && (
            <div className="center-preview">
              <img
                className="preview-image"
                src={preview}
                height="100"
              />
            </div>
          )}

          <div class="upload-btn-wrapper"></div>
          <Form.Group className="mb-3" controlId="new-post-textarea">
            <Form.Label style={{ display: "none" }}>
              for later?
            </Form.Label>
            <Form.Control
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              as="textarea"
              rows={2}
            />
          </Form.Group>
          <div id="post-button-container">
          <label
            htmlFor="file-upload"
            className="btn"
            id="send-button"
            style={{
              
              color: "#FFFFFF",
              padding: "10px 20px",
              borderRadius: "5px",
              fontWeight: "bold",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            <FontAwesomeIcon icon={faMountainSun} style={{ marginRight: "10px" }} />
            Upload a file
          </label>
          <input
            id="file-upload"
            className="file-input"
            type="file"
            onChange={handleImage}
            style={{ display: "none" }}
          />


            <Button type="submit" id="send-button" size="medium">
              Post
            </Button>
          </div>
        </form>
      </Card>

    )
}
export default NewPost