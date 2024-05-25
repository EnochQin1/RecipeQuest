import React, { useState } from 'react';
/*import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ToolBar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../images/RecipeQuestLogo.png';
import profileIcon from '../images/UserProfileIcon.png';
import listIcon from '../images/ShoppingListIcon.png';*/

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/RecipeQuestLogo.png';
import profileIcon from '../images/UserProfileIcon.png';
import listIcon from '../images/ShoppingListIcon.png';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';


const NavBar = () => {
    return (
        <Navbar
            expand="lg"
            className="bg-body-tertiary"
            fixed="top"
            style={{
                background:
                    "linear-gradient(90deg, #E74E36 0%, rgba(231, 78, 54, 0.43) 100%)",
                height: "80px",
                padding: 0
            }}
        >
            <Grid container style={{ flexDirection: 'row', width: '100vw', padding: 0 }}>
                <Grid item xs={1} style={{positon: 'absolute', top: 0, right: 0}}>
                <Navbar.Brand href="/home">
                    <img
                        src={logo}
                        alt=""
                        height="80px"
                        width="80px"
                        sticky="top"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                </Grid>

                <Grid item xs={10}>
                    <p></p>
                </Grid>

                <Grid item xs={1}>
                <Stack direction="row" spacing={2}>
                <Navbar.Brand href="/shopping-list">
                    <img
                    style={{marginTop: 20}}
                        src={listIcon}
                        alt=""
                        height="40px"
                        width="40px"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>

                <Navbar.Brand href="/profile-page">
                    <img
                        src={profileIcon}
                        alt=""
                        height="80px"
                        width="80px"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                </Stack>
                </Grid>
                
            </Grid>

        </Navbar>
        /*
        const primary ={
            main: "linear-gradient(90deg, #E74E36 0%, rgba(231, 78, 54, 0.43) 100%)",
        }
        return (
      <AppBar
      position='static'
      //color="linear-gradient(90deg, #E74E36 0%, rgba(231, 78, 54, 0.43) 100%)"
      sx={{ height: '80px', background: primary.main, boxSizing: 'border-box', width: '100vw'}}
      >
        <ToolBar>
            <IconButton href='/' sx={{ marginLeft: '-1.6vw'}}>
                <img src={logo} alt='' height='80px' width='80px'/>
            </IconButton>
    
            <IconButton href='shopping-list' edge='end' sx={{ top: 0, right: 5, position: 'absolute'}}>
                <img src={listIcon} alt='' height='40px' width='40px'/>
            </IconButton>
    
            <IconButton href='profile-page' edge='end'sx={{marginLeft: 2, top: 0, right: 0, position: 'absolute', marginTop: -1}}>
                <img src={profileIcon} alt='' height='80px' width='80px'/>
            </IconButton>
            </ToolBar>
      </AppBar>*/


    );
};

export default NavBar;