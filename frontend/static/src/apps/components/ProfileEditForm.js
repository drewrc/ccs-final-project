import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
      };

      const options = [
        'Gender',
        'Female',
        'Male',
        'Transgender',
        'Nonbinary',
        'Other',
      ];
      
      export default function ProfileEditForm() {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [profile, setProfile] = useState({})
        const [firstName, setFirstName] = useState("")
        const [lastName, setLastName] = useState("")
        const [gymLocation, setGymLocation] = useState("")
        const [pronouns, setPronouns] = useState("")
        const [gender, setGender] = useState("")
        const [biography, setBiography] = useState("")
        const [username, setUsername] = useState("")
       
        const profiles = Object.keys(profile).length;
        const [anchorEl, setAnchorEl] = React.useState(null);
        const [selectedIndex, setSelectedIndex] = React.useState(1);
        const openDropDown = Boolean(anchorEl);

        console.log({gender})
        const handleClickListItem = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setGender(options[index]);
            setAnchorEl(null);
        };

        const handleCloseDropDown = () => {
            setAnchorEl(null);
        };


        useEffect(() => {
            if (profiles > 0) {
              const profileObject = profile;
              setFirstName(profile.first_name);
              setLastName(profile.last_name);
              setGymLocation(profile.gym_location);
              setPronouns(profile.pronouns);
              setGender(profile.gender);
              setBiography(profile.biography);
              setUsername(profile.username);
            }
          }, [profile, profiles]);


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

        console.log({profile})

        const handleEdit = async (e) => {
            e.preventDefault();

        
    
            const formData = new FormData();
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);
            formData.append("gym_location", gymLocation);
            formData.append("pronouns", pronouns);
            formData.append("gender", gender);
            formData.append("biography", biography);
           
                const options = {
                    method: "PUT",
                    headers: {
                      "X-CSRFToken": Cookies.get("csrftoken"),
                    },
                        body: formData,
                    };
                    try {
                    const response = await fetch(`/api_v1/user_edit_profile/${profile.id}/`, options);
                    const data = await response.json();
                    console.log({data})
                    } catch (error) {
                        console.error(error)
                    }
            }

        const bioHTML = (
            <div key={profile.id}>
            <form onSubmit={handleEdit}>
            <p  className="profile-content" > 
                Username: <input
                    placeholder={username}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
            </p>
              <p className="profile-content"> 
                    First name:  <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                </p>
                <p className="profile-content">
                    Last name: <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                </p>
              <p className="profile-content">
                Location: <input
                    type="text"
                    value={gymLocation}
                    onChange={(e) => setLastName(e.target.value)}
                    />
              </p>
              <p className="profile-content">
                Pronouns: <input
                    type="text"
                    value={pronouns}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </p>
              <p className="profile-content">
                <List
                    component="nav"
                    aria-label="Device settings"
                    sx={{ bgcolor: 'background.paper' }}
                >
                    <ListItem
                    button
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="Gender"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    >
                    <ListItemText
                        primary="Gender"
                        secondary={options[selectedIndex]}
                    />
                    </ListItem>
                    </List>
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        open={openDropDown}
                        onClose={handleCloseDropDown}
                        MenuListProps={{
                        'aria-labelledby': 'lock-button',
                        role: 'listbox',
                        }}
                        >
                        {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            disabled={index === 0}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                            >
                            {option}
                        </MenuItem>
                        ))}
                    </Menu>
              </p>
              <p className="profile-content-bio">
                Activities:
                </p>
              <p className="profile-content-bio">
                Bio: <input
                    type="text"
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                    />
                </p>
                <button
                    type="submit">
                        Save
                        </button>
                </form>
            </div>
          );

        return (
          <div>
            <Button onClick={handleOpen}>
                <button 
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
