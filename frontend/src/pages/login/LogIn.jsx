import React, { useState } from 'react';
import EmailEntry from '../../components/EmailEntry';
import PasswordEntry from '../../components/PasswordEntry';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import logo from '../../images/RecipeQuestLogo.png';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import GoogleLogIn from '../../images/SignInWithGoogle.png';
import '../../firebase-authentication'
import { handleEmailPasswordSignIn, handleGoogleSignIn } from './FirebaseLogin.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { useNavigate } from 'react-router-dom';
import { handleGoogleSignUp } from '../signup/FirebaseSignUp.jsx';
import getData from '../../components/create.jsx'
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Container from 'react-bootstrap/Container';

const handleKeyPress = (event, email, password) => {
  console.log(event.key + " pressed")
  if (event.key === 'Enter') {
    console.log("Enter")
    event.preventDefault();
    handleEmailPasswordSignIn(email, password);
  }
}

const setCookie = (name, value) => {
  localStorage.setItem(name, value)
}

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [showPassword, setShowPassword ] = useState(false);

  const handleClickShowPassword= () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {event.preventDefault();};

  const fetchData = async () => {
    setEmail(localStorage.getItem("userEmail"))
    const response = await fetch(`/api/users/email/` + localStorage.getItem("userEmail"), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()

    if (response.ok) {
      navigate('/home');
    } else {
      navigate('/google-sign-up');
    }
}
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate a password reset request (this will be done later using backend)
    try {
      await handleGoogleSignUp().then((result) => {
        if (result === 1) {
          fetchData(email)

        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEmailPasswordSignIn = async () => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          setCookie("userEmail", email)
          alert("successfully signed in as: " + user.email);
          navigate('/home');
          // ...
        })
        .catch((error) => {
          alert("Invalid Credentials");
        });
    } catch (error) {
      // ...

      const errorCode = error.code;
      const errorMessage = error.message;

    }
  }


  return (
    <div>
      <style>
        {`
        body { 
          background-color: radial-gradient(37.73% 37.73% at 32.75% 18.87%, rgba(243, 167, 155, 0.49) 0%, rgba(255, 255, 255, 0) 100%);
          height: 100%;
        }
        `}
      </style>

      <Container className='justify-content-center'>
      <img src={logo} alt="Logo" draggable={false}
        style={{
          width: 210,
          pointerEvent: 'none',
          marginBottom: 30,
          marginTop: '10vh'
        }} />

    

      <FloatingLabel
        style={{
          marginBottom: 10,
          fontSize: 16,
          fontFamily: 'Roboto',
          height: 'auto',
          width: 210
        }}
        controlId='floatingInput'
        label='Email address'
        className='email'>
        <Form.Control type='email' placeholder='name@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
      </FloatingLabel>

        <Stack spacing={-5} direction='row' >
      <FloatingLabel controlId='floatingPassword' label='Password'
        style={{
          fontSize: 16,
          fontFamily: 'Roboto',
          height: 'auto',
          width: 250,
          marginBottom: -5
        }}>
        <Form.Control type={showPassword ? 'text' : 'password'} placeholder='Password' 
        value={password} onChange={(e) => setPassword(e.target.value)} 
        style={{ width: 210}}/>

      </FloatingLabel>
      <IconButton
      style={{marginTop: 6}}
      aria-label='toggle password visibility'
      onClick={handleClickShowPassword}
      onMouseDown={handleMouseDownPassword}
      edge='end'>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
      </Stack>
      

      <Nav className='justify-content-center' activeKey='/password-reset' as='ul'>
        <Nav.Item as='li'>
          <Nav.Link
            style={{
              fontSize: 15,
              fontFamily: 'Roboto',
              color: '#6F6F6F',
              marginLeft: -40
            }}
            href='/password-reset'>Forgot your Password?</Nav.Link>
        </Nav.Item>
      </Nav>



      <style type='text/css'>
        {`
      .btn-flat {
      background-color: #EC7765;
      color: white;
      fontSize: 16;
      fontFamily: Roboto;
      }
      img.GoogleImage {
        transition: linear all 0.1s;
        cursor: pointer;
      }
      img.GoogleImage:hover {
        box-shadow: 1px 1px 10px 0px gray;
      }

      nav.link {
        transition: linear all 0.1s;
        cursor: pointer;
      }
      'nav.link':hover {
        color: purple;
      }
      
      `}
      </style>

      <Button
        style={{ width: 210, marginTop: 15, flexDirection: 'row', flexWrap: 'nowrap' }}
        variant='flat'
        onClick={() => handleEmailPasswordSignIn(email, password)}
        type="submit">Sign In</Button>{' '}

      <img className='GoogleImage'
        src={GoogleLogIn}
        alt=''
        style={{
          width: 210, marginTop: 15, flexDirection: 'row', flexWrap: 'nowrap', display: 'block'
        }}
        onClick={handleSubmit}
        /*if verified, go to home page*/
        href='/google-sign-up'
      />


      <Nav className='justify-content-center' activeKey='/sign-up'>
        <Nav.Item>
          <Nav.Link
            className='SignUp'
            style={{
              fontSize: 18,
              fontFamily: 'Roboto',
              color: '#6F6F6F',
              marginLeft: -50
            }}
            href='/sign-up'>Sign Up</Nav.Link>
        </Nav.Item>
      </Nav>
      </Container>
    </div>
    


  )
}

export default LogIn;