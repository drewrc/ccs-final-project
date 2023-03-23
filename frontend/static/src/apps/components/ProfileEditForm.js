import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faGears, faMugSaucer, faPencil, faPhone, faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Col, Row, Container } from "react-bootstrap";
import MouseOverPopover from "./Popover";
import ActivityHelp from "./ActivityInfo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const options = [
  "Gender",
  "Female",
  "Male",
  "Transgender",
  "Nonbinary",
  "Other",
];

export default function ProfileEditForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [profile, setProfile] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gymLocation, setGymLocation] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [gender, setGender] = useState("");
  const [biography, setBiography] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("");
  const user = profile.user;

  const profiles = Object.keys(profile).length;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const openDropDown = Boolean(anchorEl);

  console.log({ gender });
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
      setPhone(profile.phone);
      // setActivities(profile.activities);
    }
  }, [profile, profiles]);

  //------------------- > fetching PROFILE FOR USER (SELF)  <--------------------//
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch("/api_v1/current_user/");
      const data = await response.json();
      setProfile(data);
      console.log({ data });
    };
    fetchUserProfile();
  }, []);

  const handleActivities = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("name", activity)

    const obj = {
      name: activity,
    };

    console.log({ obj });

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: activity }),
    };
    try {
      const response = await fetch(`/api_v1/new_activity/`, options);
      const data = await response.json();
      console.log({ data });
    } catch (error) {
      console.error(error);
    }
  };

  // const activityIds = activities.map((activity) => activity.id);

  console.log({ activity });

  const handleEdit = async (e) => {
    e.preventDefault();
    //

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("gym_location", gymLocation);
    formData.append("pronouns", pronouns);
    formData.append("gender", gender);
    formData.append("biography", biography);
    formData.append("phone", phone);
    // formData.append("activities", activityIds);
    // formData.append("user", user);

    const options = {
      method: "PATCH",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    try {
      const response = await fetch(
        `/api_v1/user_edit_profile/${profile.id}/`,
        options
      );
      const data = await response.json();
      console.log({ data });
    } catch (error) {
      console.error(error);
    }
  };

  const bioHTML = (
    <div key={profile.id}>
      <form onSubmit={handleEdit} style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div 
      
        style={{ 
          fontFamily: 'Raleway',
          width: '100%' }}>
        <Container>
          <Row

          style={{
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          >
            <Col
            
            style={{
              width: "50%",
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: '0px',
            }}
            xs={6}>
            <p className="profile-content">
             <strong> Username:</strong>
              <input
                    style={{ width: '90%', padding: '2px', borderRadius: '10px' }}
                placeholder={username}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>
            <p className="profile-content">
            <strong>First name:{" "}</strong>
              <input
              style={{
                width: "90%",
                marginLeft: 'auto',
                marginRight: 'auto',
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                color: "#333",
                borderRadius: '10px',
              }}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </p>
            <p className="profile-content">
            <strong> Last name:{" "}</strong>
              <input
              style={{
                width: "90%",
                padding: "2px",
                marginLeft: 'auto',
                marginRight: 'auto',
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                color: "#333",
                borderRadius: '10px',
              }}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </p>
            <p className="profile-content">
            <strong> Phone:{" "}</strong>
              <input
              style={{
                width: "90%",
                padding: "2px",
                // marginLeft: '20px',
                // marginRight: '20px',
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                color: "#333",
                borderRadius: '10px',
              }}
              id="profile-input"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </p>
            <p className="profile-content">
            <strong> Location:{" "}</strong>
              <input
                    style={{ width: '90%', padding: '2px', borderRadius: '10px' }}
                placeholder={gymLocation}
                type="text"
                value={gymLocation}
                onChange={(e) => setGymLocation(e.target.value)}
              />
            </p>
            </Col>
            <Col 
            style={{
              width: "50%",
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            xs={6}>
                <p className="profile-content">
                <strong> Pronouns:{" "}</strong>
                <input
                  style={{
                    width: "100%",
                    padding: "2px",
                    // marginLeft: '20px',
                    // marginRight: '20px',
                 
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    color: "#333",
                    borderRadius: '10px',
                  }}
                  type="text"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                />
              </p>
       
            <p className="profile-content">
          <List
            component="nav"
            aria-label="Device settings"
            // sx={{ bgcolor: "background.paper" }}
          >
            <ListItem
              button
              style={{
                fontFamily: "Arial, sans-serif",
              }}
              // sx={{
              //   fontFamily: "Arial, sans-serif",
              // }}
              id="Gender-box lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="Gender"
              aria-expanded={open ? "true" : undefined}
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
              "aria-labelledby": "lock-button",
              role: "listbox",
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
            <form onSubmit={handleActivities}>
              <p 
              style={{
                position: 'relative'
              }}
              className="profile-content">
                <div
                style={{
                  position: 'absolute',
                  left: '90%',
                }}
                ><ActivityHelp /> </div>
                <strong>New Activity:</strong>
                <input
                  style={{
                    width: "100%",
                    padding: "2px",
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    color: "#333",
                    borderRadius: '10px',
                  }}  
                  type="text"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                />
                <button
                
                style={{
                  width: "40%",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  marginTop: '2%',
                  marginLeft: '30%',
                  marginRight: 'auto',
                  fontSize: "16px",
                  color: "#333",
                  borderRadius: '20px',
                  color: 'white',
                }}
                  type="submit"
                  id="add-activity"
                  // onClick={(e) => handleActivities(activity)}
                >
                  <strong
                  >submit activity </strong>
                  <strong 
                  style={{
                    paddingLeft: '5px',
                    color: 'white',
                  }}
                  >
                  <FontAwesomeIcon 
                  icon={faPlus} />
                  </strong>
                </button>
              </p>
              
            </form>
            </Col>
            <p 
            className="profile-content-bio-edit">
              <p 
              style={{
                paddingTop: '5%',
                paddingBottom: '2%',
                textAlign: 'left'}}
              >
                  <MouseOverPopover />
                </p>
              <textarea
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                style={{
                  width: "100%",
                  height: "120px",
                  borderRadius: "10px",
                  padding: "10px",
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  fontFamily: "Arial, sans-serif",
                  fontSize: "16px",
                  color: "#333",
                  border: "1px solid #ccc",
                  boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
                  resize: "vertical",
                }}
              />
            </p>
          </Row>
          <button 
          id="save-button"
          type="submit">
            Save
            </button>
        </Container>
        </div>
      </form>
      
    </div>
  );

  return (
    <div 
      style={{
        width: '100%',
      }}
    >
      <Button type="submit" id="open-edit-profile" onClick={handleOpen}>
          click to edit <FontAwesomeIcon icon={faPencil} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box
        id="make-me-bigger"
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '2%',
          width: '50%',
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '40px',
          }}>
          <Typography 
           sx={{ p: 1, 
            fontFamily: 'Roboto Condensed',
         
            fontSize: '38px',
            letterSpacing: '0.5px',
            textAlign: 'center',
            borderBottom: '3px solid black',
            marginBottom: '20px',
            textShadow: '1px 2px 3.5px black',
            }}
          // variant="h6" component="h2"
          
          >
            Profile Settings <FontAwesomeIcon icon={faGears} />
          </Typography>
          <Typography id="make-me-responsive" sx={{ mt: 2 }}>
            {bioHTML}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
