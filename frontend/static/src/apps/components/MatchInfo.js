import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faMugSaucer, faShare, faReply, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { fontSize } from '@mui/system';

export default function MouseOverPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div
    style={{fontFamily: 'Raleway',}}
    >
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{
            fontSize: '18px',
            fontFamily: 'Raleway',
            letterSpacing: '0.5px',
            marginRight: '12px',
        }}
      >
             <strong
              style={{
                marginRight: '7px',
            }}
             > </strong> 
             <FontAwesomeIcon
             id="matching-help"
             icon={faQuestionCircle} />
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
                <Typography sx={{ p: 1, 
                padding: '20px',
                fontSize: '18px',
                letterSpacing: '0.5px',
                }}>
            <p 
           
            id="matching-help">
                    <FontAwesomeIcon 
                     style={{
                        paddingRight: '10px'
                    }}
                    icon={faShare} />
                    Swipe right to match</p>
                    <p 
                  
                    
                    id="matching-help">
                    
            Swipe left to pass 
            <FontAwesomeIcon 
              style={{
                paddingLeft: '10px'
            }}
            icon={faReply} />
            </p>
            </Typography>
      </Popover>
    </div>
  );
}