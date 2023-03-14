import Button from 'react-bootstrap/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Post ({id, text, img, author, showFullText, toggleText }) {
    const fullText = showFullText ? text : text.slice(0, 50);
  
    return (
    <>
        <Card id="post-display" key={id} sx={{ maxWidth: 545 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%"
          image={img}
          alt="a string for now"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          created by {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <p>{fullText}</p>
          <p>{text.length > 50 && (
                <Button variant="primary" onClick={toggleText}>
                  {showFullText ? 'See less' : 'See more'}
                </Button>
              )}
            </p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

      </>
    )
  }
  export default Post