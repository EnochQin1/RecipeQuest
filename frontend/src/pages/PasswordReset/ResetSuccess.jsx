import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import RecipeQuestLogo from '../../images/RecipeQuestLogo.png';

function ResetSuccess() {
  const contentBoxStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    fontFamily: 'Roboto',
  };

  const TextStyle = {
    fontSize: '16px', 
    fontFamily: 'Roboto', 
    color: 'black', 
    padding: '10px', 
    borderRadius: '5px', 
    marginTop: '15px', 
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
            <h1>Password Reset</h1>
            <p style={TextStyle}>Password reset link successfully sent to your email.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResetSuccess;


