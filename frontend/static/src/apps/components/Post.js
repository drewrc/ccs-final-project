import { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { faHeart, faPencil, faThumbsUp, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditPost from './EditPost';
import { AuthContext } from '../auth/auth-context/AuthContext';

function Post ({id, text, img, author, showFullText, toggleText, timelineId, handleLike, likes }) {
  const { userID } = useContext(AuthContext);

  const [ editPost, setEditPost ] = useState(false)
  const [file, seFile] = useState("")
  const [user, setUser]= useState(userID.username)
  console.log({user})
  
  const fullText = showFullText ? text : text.slice(0, 50);

    const handleEditClick = async (e) => {
      e.preventDefault();
      setEditPost(true)
    }
    const handleDelete = async (e) => {
      e.preventDefault();
      const options ={
        method: "DELETE",
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken")
        }
      }
        const response = await fetch(`/api_v1/edit_story/${id}/`, options);
        const data = await response.json();
    }

    return (
    <div key={id}>
    <Card id="post-display" key={id} sx={{ maxWidth: 545 }}>
              <Typography id="post-header" gutterBottom variant="h5" component="div">
                {author}
              </Typography>

            {!editPost && (
              <>
                <CardActionArea id="post-card-content">
                  <CardMedia
                    component="img"
                    height="100%"
                    image={img}
                    alt="a string for now"
                  />
                  <CardContent >
                    <Typography variant="body2" color="text.secondary">
                    <p>{fullText}</p>
                    </Typography>
                  </CardContent>
                </CardActionArea>

                  <p id='see-more-button'>{text.length > 50 && (
                            <Button 
                            // variant="primary" 
                            id="see-more"
                            onClick={toggleText}
                            style={{ width: '50%', 
                            border: '1px solid rgba(252, 160, 60, 0.5)',
                            boxShadow: '1px 1px 5px rgba(100, 100, 100, 0.5)'
                            }}
                            >
                              {showFullText ? 'See less' : 'See more'}
                            </Button>
                          )}
                        </p>
                    </>
                  )}

                {editPost && (
                  <EditPost
                    id = {id}
                    text={text}
                    img={img}
                    timelineId={timelineId}
                    onSubmit={(newText, newImg) => {
                      // handleEditSubmit function here
                      setEditPost(false);
                    }}
                    onCancel={() => setEditPost(false)}
                  />
                )}  

            <button 
                onClick={() => handleLike(id)}
                className="trash-button" 
                type="submit">
                    <FontAwesomeIcon icon={faThumbsUp} /> {likes}
            </button>
   
            <button 
                // onClick={handleLove}
                className="trash-button" 
                type="submit">
                    <FontAwesomeIcon icon={faHeart} />
            </button>

            {!editPost && author === user && (
            <>
            <p className="trash-button" >
            <button 
                onClick={handleEditClick}
                className="trash-button" 
                type="submit">
                    <FontAwesomeIcon icon={faPencil} />
            </button>

            <button 
                onClick={handleDelete}
                className="trash-button" 
                type="submit">
                    <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </p>
          </>
          )}
    </Card>

      </div>
    )
  }
  export default Post