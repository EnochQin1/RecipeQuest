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
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the email exists in your Firebase authentication database
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setResetStatus('Password reset email sent successfully!');
          navigate('/ResetSuccess');
        })
        .catch((error) => {
          console.error('Error:', error);
          setResetStatus('An error occurred. Please try again later.');
        });
    } catch (error) {
      console.error('Error:', error);
      setResetStatus('An error occurred. Please try again later.');
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

  return (
    <div>
      <style>
        {`
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
        `}
      </style>
      <Container>
        <Row className="justify-content-center">
          <Col xs={6} md={4} style={contentBoxStyle}>
            <Image src={RecipeQuestLogo} thumbnail />
            <h1 className="mb-3">Password Reset</h1>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
              >
                <Form.Control
                  required
                  value={email}
                  type="email" placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)} />
              </FloatingLabel>
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
              >
                Reset Password
              </Button>
            </form>


            <div>{resetStatus}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PasswordReset;