import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../images/RecipeQuestLogo.png';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import {useNavigate} from 'react-router-dom';
import { handleEmailPasswordSignUp, handleGoogleSignUp } from './FirebaseSignUp';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { handleGoogleSignIn } from '../login/FirebaseLogin';
import {userEmail} from '../login/LogIn.jsx';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const setCookie = (name, value) => {
  localStorage.setItem(name, value)
}
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userData, setUserData] = React.useState(null);
  const [userVerified, setUserVerified] = React.useState(false);
  const [showPassword, setShowPassword ] = useState(false);
  const handleClickShowPassword= () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {event.preventDefault();};

  const entryStyle = {
    marginBottom: 10,
    width: '30vh',
    fontSize: 16,
    fontFamily: 'Roboto',
  }
  let navigate = useNavigate();
  const SignUpHandler = async () => {
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
          setUserVerified(data["Verified"])
      } else {
          alert("Error retrieving data")
      }
  }
    await handleEmailPasswordSignUp(username, name, email, password, confirmPassword)
      .then((result) => {
        if (result === 1) {
          setCookie("userEmail", email)
          fetchData()
          if (userVerified) {
            navigate('/home');
          } else {
            navigate('/verify-email');
          }
        }
      })
      .catch((error) => {
      });
    };
  
  
  return (
    <div>

      <nav>
        <Navbar expand='lg' className='bg-body-tertiary' fixed='top'
          style={{
            background: 'linear-gradient(90deg, #E74E36 0%, rgba(231, 78, 54, 0.43) 100%)',
            height: '80px',
          }}>
          <Container
            style={{ marginLeft: -10 }}>
            <Navbar.Brand href='/'>
              <Image
                src={logo}
                alt=''
                height='80px'
                width='80px'
                sticky='top'
                className='d-inline-block align-top'
              />
            </Navbar.Brand>
          </Container>
        </Navbar>
      </nav>


      <div
        style={{
          marginTop: '200px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ fontFamily: 'Roboto', fontSize: 32, marginBottom: 40, marginTop: -35 }}>Sign Up</h1>
        <FloatingLabel
          style={{
            marginBottom: 10,
            fontSize: 16,
            fontFamily: 'Roboto',
            width: '30vh'
          }}
          controlId='floatingInput'
          label='Name'
          className='name'
        >
          <Form.Control type='Name' placeholder='Basic Name' value={name} onChange={(e) => setName(e.target.value)} />
        </FloatingLabel>

        <FloatingLabel
          style={{
            marginBottom: 10,
            fontSize: 16,
            fontFamily: 'Roboto',
            width: '30vh'
          }}
          controlId='floatingInput'
          label='Username'
          className='username'
        >
          <Form.Control type='Username' placeholder='Basic Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </FloatingLabel>

        <FloatingLabel
          controlId='floatingInput'
          label='Email'
          className='email'
        >
          <Form.Control
            style={{
              marginBottom: 10,
              width: '30vh',
              fontSize: 16,
              fontFamily: 'Roboto',
            }}
            type='Name' placeholder='name@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
        </FloatingLabel>

        <Stack spacing={-5} direction ='row' >

        <FloatingLabel
          style={{
            marginLeft: 45,
            marginBottom: 10,
            fontSize: 16,
            width: '30vh',
            fontFamily: 'Roboto',
          }}
          controlId='floatingPassword' label='Password'>
          <Form.Control type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </FloatingLabel>

        <IconButton
      style={{marginTop: -10, marginLeft: 5}}
      aria-label='toggle password visibility'
      onClick={handleClickShowPassword}
      onMouseDown={handleMouseDownPassword}
      edge='end'>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
        </Stack>

        <FloatingLabel
          style={{
            marginBottom: 10,
            fontSize: 16,
            width: '30vh',
            fontFamily: 'Roboto',
          }}
          controlId='floatingPassword' label='Confirm Password'>
          <Form.Control type={showPassword ? 'text' : 'password'} placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        </FloatingLabel>

        <style type='text/css'>
          {`
                  .btn-flat {
                  background-color: #EC7765;
                  color: white;
                  fontSize: 16;
                  fontFamily: Roboto;
                  }
                  `}
        </style>
        <Button
          style={{ width: '30vh', marginTop: 20, flexDirection: 'row', flexWrap: 'nowrap' }}
          variant='flat'
          onClick={() => SignUpHandler()}
          type="submit">Create Account</Button>{' '}
      </div>
    </div>

    //add confirm sign up button
  );

}

export default SignUp;
