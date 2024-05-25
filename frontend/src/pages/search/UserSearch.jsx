import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from '../../images/RecipeQuestLogo.png';
import profileIcon from '../../images/UserProfileIcon.png';
import listIcon from '../../images/ShoppingListIcon.png';
import NavBar from '../../components/navBar.jsx';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from 'react-router-dom';
import UserProfileTransparent from '../../images/UserProfileTransparent.png';
import profileCard from '../../components/profileCard.jsx';
import ProfileCard from '../../components/profileCard.jsx';
const buttonStyle = {
  backgroundColor: 'linear-gradient(90deg, #E74E36 0%, rgba(231, 78, 54, 0.43) 100%)',
  border: 'none',
  color: 'white',
  fontSize: '18px',
  padding: '10px 20px',
  margin: '10px',
};

function UserSearch() {
  const [searchText, setSearchText] = React.useState('Discover Users');
  const [searchQuery, setSearchQuery] = React.useState('')
  const [alignment, setAlignment] = React.useState('recipes')
  const [users, setUsers] = React.useState([])

  const navigate = useNavigate()


  const onSearch = async (Query) => {
    const response = await fetch(`/api/users/search/` + Query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (response.ok) {
      setUsers(data)
    } else {
      alert("No matching users")
    }
  }

  useEffect(() => {
    if (localStorage.getItem("Query") != null) {
      onSearch(localStorage.getItem("Query"))
      localStorage.removeItem("Query")
    }
  }, []);


  return (
    <div>
      <NavBar />


      <Container style={{ marginTop: 100, textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Roboto', fontSize: 32 }}>Search for Users</h1>
      </Container>
      <Container style={{ marginTop: 20, textAlign: 'center' }}>
        <Paper
          component='form'
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}>
          <InputBase
            sx={{ m1: 1, flex: 1, marginLeft: 2 }}
            placeholder={searchText}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputProps={{ 'aria-label': { searchText } }}
          />
          <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={() => onSearch(searchQuery)}>
            <SearchIcon />
          </IconButton>

        </Paper>
      </Container>
      <h2 style={{ fontFamily: 'Roboto', marginLeft: 14, marginTop: 10}}> Results</h2>

      <ul>
        {users.length > 0
          ? users.map((user, index) => (
            <div key={index} style={{ marginBottom: 15}}>
              <ProfileCard
                username={user["Username"]}
                profilePicture={UserProfileTransparent}
                email={user["Email"]}
              />
            </div>
          )) : <p>No Users Yet!</p>
        }
      </ul>

    </div>
  );
}

export default UserSearch;