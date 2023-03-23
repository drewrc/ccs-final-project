import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProfileHelp() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{
        
            
        }}
      >
         What is this <FontAwesomeIcon icon={faCircleQuestion} />
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography 
         
        sx={{ p: 1, 
            padding: '20px',
            fontFamily: 'raleway',
            wordSpacing: '2px',
            textAlign: 'center',
            padding: '40px',
        }}>
            <p 
            style={{
                    fontFamily: 'Roboto Condensed',
                    fontSize: '32px',
              
                }}
            >Welcome to your Profile Page!</p>
            <p>Here you can 
                <strong 
                style={{

                    fontFamily: 'Roboto Condensed',
                }}
                > CREATE NEW POSTS</strong>,
                edit old posts, </p>
                <p>or delete ones 
               you don't like anymore.<p>
               <p>You can also </p>
                <strong
                style={{
                    fontFamily: 'Roboto Condensed',
                }}
                > UPDATE your PROFILE </strong> </p>
            and edit or delete any information you like.</p>
            <p><strong
            style={{
                fontFamily: 'Roboto Condensed',
            }}
            > IMPORTANT: </strong> </p> <p>You will not recieve </p>
                <strong
                style={{
                    fontFamily: 'Roboto Condensed',
                }}
                > <p 
                id="warning"
                >PHONE NOTIFICATIONS </p></strong>
               <p>if you don't have a <strong
               style={{
                fontFamily: 'Roboto Condensed',
            }}
              id="warning" > VALID NUMBER </strong> saved.</p> 
        </Typography>
      </Popover>
    </div>
  );
}