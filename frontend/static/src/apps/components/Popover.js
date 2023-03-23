import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons';
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
             >Keep scrolling to give us the tea . . . </strong> 
             <FontAwesomeIcon icon={faMugSaucer} />
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
        fontFamily: 'Raleway',
        padding: '20px',
        fontSize: '18px',
        letterSpacing: '0.5px',
        }}>
            <p><em
            style={{fontFamily: 'Roboto Condensed',}}
            >Tell us about yourself. . . </em></p>
            <p><strong>what's your story?</strong></p>
            </Typography>
      </Popover>
    </div>
  );
}