import { useEffect, useState } from 'react';
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

function Post ({id, text, img, author, showFullText, toggleText }) {
  const [ editPost, setEditPost ] = useState(false)
  const [file, seFile] = useState("")
  
  const fullText = showFullText ? text : text.slice(0, 50);

    const handleEditClick = async (e) => {
      e.preventDefault();
      setEditPost(true)
    }
      // const formData = new FormData();
      // formData.append("img", file);
      // formData.append("text", editPost);

      // const options = {
      //   method: "POST",
      //   headers: {
      //     "X-CSRFToken": Cookies.get("csrftoken"),
      //   },
      //   body: formData,
      // };
      // const response = await fetch(`/api_v1/current_user/${id}/`, options);
      // const data = await response.json();
    // };
  
    

    return (
    <>
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
                    text={text}
                    img={img}
                    onSubmit={(newText, newImg) => {
                      // handleEditSubmit function here
                      setEditPost(false);
                    }}
                    onCancel={() => setEditPost(false)}
                  />
                )}  

            <button 
                // onClick={handleLike}
                className="trash-button" 
                type="submit">
                    <FontAwesomeIcon icon={faThumbsUp} />
            </button>
   
            <button 
                // onClick={handleLove}
                className="trash-button" 
                type="submit">
                    <FontAwesomeIcon icon={faHeart} />
            </button>

            {!editPost && (
            <>
            <p className="trash-button" >
            <button 
                onClick={handleEditClick}
                className="trash-button" 
                type="submit">
                    <FontAwesomeIcon icon={faPencil} />
            </button>

            <button 
                // onClick={handleDelete}
                className="trash-button" 
                type="submit">
                    <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </p>
          </>
          )}
    </Card>

      </>
    )
  }
  export default Post