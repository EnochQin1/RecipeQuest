import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import RecipeQuestLogo from '../../images/RecipeQuestLogo.png';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function NewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your logic for handling the form submission here

    // For demonstration purposes, we're simply navigating to a success page
    navigate('/ResetSuccess');
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
            <h1 className="mb-3">Reset Password</h1>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
              <FloatingLabel controlId="newPassword" label="New Password">
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FloatingLabel>
              <br />
              <FloatingLabel controlId="confirmNewPassword" label="Confirm New Password">
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
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

export default NewPassword;





