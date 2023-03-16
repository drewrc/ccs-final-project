import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
      };
      
      export default function ProfileEditForm() {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [profile, setProfile] = useState({})

        //------------------- > fetching PROFILE FOR USER (SELF)  <--------------------//
        useEffect(() => {
            const fetchUserProfile = async () => {
            const response = await fetch('/api_v1/current_user/')
            const data = await response.json();
            setProfile(data);
            console.log({data})
            }
            fetchUserProfile();
        }, []);

        const bioHTML = (
            <div key={profile.id}>
              <p className="profile-content">
                
                First name: {profile.first_name} 
                
                </p>
                <p className="profile-content">

                Last name: {profile.last_name}


                </p>

              <p className="profile-content">
                
                Location: {profile.gym_location}
              
              </p>
              <p className="profile-content">
                
                Pronouns: {profile.pronouns}
                
                </p>

              <p className="profile-content">
                
                Gender: {profile.gender}
              
              </p>
              <p className="profile-content-bio">
                
                Activities:
                
                </p>
              <p className="profile-content-bio">
                
                Bio: {profile.biography}
                
                </p>
            </div>
          );

        return (
          <div>
            <Button onClick={handleOpen}>
            <button 
                      // onClick={handleEditClick}
                      className="trash-button" 
                      type="submit">
                          <FontAwesomeIcon icon={faPencil} />
                  </button>
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Bio
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {bioHTML}
                </Typography>
              </Box>
            </Modal>
          </div>
        );
      }
