import React from "react";
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const setCookie = (name, value) => {
    localStorage.setItem(name, value)
}
const RecipeCard = ({ image, title, rating, badges = [], sourceUser, width, height = '18rem', email, id }) => {
    var uploaderTag = 'Uploaded by: ' + sourceUser;
    const firstBadges = badges.slice(0, 3);
    const badgeChips = firstBadges.map((chip) => (
        <Chip
            label={chip}
            style={{ fontSize: 14, marginRight: '2px', width: 'auto' }}
        />
    ));

    const handleClick = (e) => {
        e.preventDefault();
        window.localStorage.setItem("RecipeId", id)
        window.location.href = '/recipe-display';
    }


    const navigateProfile = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (localStorage.getItem("userEmail") != email) {
            setCookie('profileView', email);
            window.location.href = '/view-profile-page';
        } else {
            window.location.href = '/profile-page'
        }
    };


    return (
        <a style={{ cursor: 'pointer' }} onClick={handleClick}>
            <Card style={{ width, height, maxWidth: '60vw', maxHeight: 142 }}>
                <Row style={{ marginTop: 20, marginRight: -125 }}>
                    <Col md={{ offset: 2 }}>
                        <Card.Title>{title}</Card.Title>
                    </Col>
                </Row>

                <Row style={{ marginRight: -125 }}>
                    <Col>
                        <Card.Img variant='left' src={image} style={{ width: '115px', height: '115px', marginTop: -40, marginLeft: 10 }} />
                    </Col>
                    <Col md={{ span: 5 }} style={{ marginLeft: -190, marginTop: -12 }}>
                        <Card.Body>
                            {firstBadges.length > 0 ? badgeChips : ""}
                        </Card.Body>
                    </Col>
                    <Col md={{ offset: 1 }} style={{ marginTop: -12 }}>
                        <Card.Body>
                            <Rating name='recipeRating' value={rating} readOnly />
                        </Card.Body>
                    </Col>
                </Row>

                <Row style={{ marginTop: -45, marginRight: -125 }}>
                    <Col md={{ offset: 2 }}>
                        <Card.Body>
                            <a onClick={navigateProfile} style={{ marginLeft: -15 }}>{uploaderTag}</a>

                        </Card.Body>
                    </Col>
                </Row>

            </Card>
        </a>
    );
};

export default RecipeCard;