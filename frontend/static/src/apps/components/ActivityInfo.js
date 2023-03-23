import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faMugSaucer } from '@fortawesome/free-solid-svg-icons';
import { fontFamily } from '@mui/system';

export default function ActivityHelp() {
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
      >
            <FontAwesomeIcon icon={faCircleInfo} />
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
        fontFamily: 'Roboto Condensed',
        padding: '20px',
        fontSize: '18px',
        letterSpacing: '0.5px',
        textAlign: 'center',
        }}>
            <p>Please enter activities you enjoy </p>
                <p>(ie. weightlifting, cardio, etc)</p>
                <p> one at a time! </p>
        </Typography>
      </Popover>
    </div>
  );
}