import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from '@mui/material/Switch';

export default function ToggleGender() {

  const [genderFilter, setGenderFilter] = useState(false);
  const [profileGender, setProfileGender] = useState('');

  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.checked);
    const genderQueryParam = event.target.checked ? profileGender : '';
    const url = new URL(window.location.href);
    url.searchParams.set('gender', genderQueryParam);
    window.location.href = url.toString();
  };

  // Fetch the data using the updated URL when the component mounts and when the gender filter changes
  useEffect(() => {
    fetch(window.location.href)
      .then(response => response.json())
      .then(data => console.log(data))
  }, [genderFilter]);


  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch("/api_v1/current_user/");
      const data = await response.json();
      setProfileGender(data.gender);
    };
    fetchUserProfile();
  }, []);

  return (
    <div>
      Toggle Matches by Gender:
      <div>
        <Switch
          checked={genderFilter}
          onChange={handleGenderFilterChange}
          inputProps={{ 'aria-label': 'Toggle gender filter' }}
        />
        <span>Match with {genderFilter ? 'my gender' : 'anyone'}</span>
        {genderFilter && (
          <span> ({profileGender})</span>
        )}
      </div>
    </div>
  );
}
