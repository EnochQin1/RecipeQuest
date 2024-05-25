import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProfileCard = ({ profilePicture, username, email, width, height = '18rem' }) => {
    const handleClick = (e) => {
        e.preventDefault();
        if (email != localStorage.getItem("userEmail")) {
            localStorage.setItem("profileView", email);
            window.location.href = '/view-profile-page';
        } else {
            window.location.href = '/profile-page'
        }
    };
    //untested will 99& probably need to change widths and stuff
    return (
        <a style={{ cursor: 'pointer' }} onClick={handleClick}>
            <Card style={{ width, height, maxWidth: '20vw', maxHeight: '19vh' }}>
                <Row style={{ marginTop: 52, marginLeft: 80 }}>
                    <Col md={{ offset: 2 }}>
                        <Card.Title>{username}</Card.Title>
                    </Col>
                </Row>

                <Row style={{ marginLeft: -8, marginTop: -76 }}>
                    <Col>
                        <Card.Img draggable='false' src={profilePicture} style={{ maxWidth: 120, maxHeight: 120, borderRadius: 50 }} />
                    </Col>
                </Row>
            </Card>
        </a>
    );
};

export default ProfileCard;