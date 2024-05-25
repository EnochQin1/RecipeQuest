import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import RecipeQuestLogo from '../../images/RecipeQuestLogo.png';
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

function VerifyEmail() {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate a password reset request (this will be done later using backend)
    try {
      if (firebase.auth().currentUser.emailVerified) {
        navigate('/profile-page');
      } else {
        alert("Email not yet verified. You may need to refresh the webpage.")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const contentBoxStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    fontFamily: 'Roboto',
  };

  const inputStyle = {
    fontSize: '16px',
    fontFamily: 'Roboto',
    height: 'auto',
    width: '100%',
    marginBottom: '10px',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    border: '1px solid black',
    outline: 'none',
    transition: 'all 0.2s', // Add transition for a smoother effect
  };

  // Add a :focus pseudo-class to change the border color to blue when focused
  inputStyle[':focus'] = {
    border: '1px solid #007bff',
    transform: 'translateY(-2px)', // Lower the text slightly when focused
  };

  // Use the same button styles as in the LogIn component
  const buttonStyle = {
    backgroundColor: '#EC7765',
    color: 'white',
    fontSize: '16px',
    fontFamily: 'Roboto',
    width: '100%',
    marginTop: '15px',
    border: 'none',
    ':hover': {
      backgroundColor: 'purple', // Add your desired hover color here
    },
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col xs={6} md={4} style={contentBoxStyle}>
            <Image src={RecipeQuestLogo} thumbnail />
            <h1 className="mb-3">Verify Email</h1>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
              <FloatingLabel
                controlId="floatingInput"
              >
                
              </FloatingLabel>
              <br />
              <style type='text/css'>
                {`
                  .btn-flat {
                  background-color: #EC7765;
                  color: white;
                  fontSize: 16;
                  fontFamily: Roboto;
                  }

                  nav.link {
                    transition: linear all 0.1s;
                    cursor: pointer;
                  }   
                  `}
              </style>
              <Button
                type="submit"
                variant="flat"
                style={{ width: '30vh', marginTop: 15, flexDirection: 'row', flexWrap: 'nowrap' }}
                onClick = {handleSubmit}
              >
                Check Verification
              </Button>


            </form>


            <div>{resetStatus}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default VerifyEmail;