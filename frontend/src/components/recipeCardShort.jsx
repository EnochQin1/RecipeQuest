import React from 'react';
import Card from 'react-bootstrap/Card';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const setCookie = (name, value) => {
    localStorage.setItem(name, value);
}

const RecipeCardShort = ({ image, title, rating, badges = [], sourceUser, email, id }) => {
    var uploaderTag = 'Uploaded by: ' + sourceUser;
    const firstBadges = badges.slice(0, 2);
    const badgeChips = firstBadges.map((chip) => (
        <Chip
            label={chip}
            style={{ fontSize: 14, marginRight: '2px', width: 'auto' }}
        />
    ));

    const handleClick = async (e) => {
        e.preventDefault();

        await fetch(`/api/users/visitRecipe/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Email": localStorage.getItem("userEmail"),
                "RecipeId": id
            })
        });

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
            <Card style={{ width: '33rem', height: '18rem', maxWidth: '60vw', maxHeight: 142 }}>
                <Row style={{ marginTop: 20, marginRight: -350 }}>
                    <Col md={{ offset: 2 }}>
                        <Card.Title>{title}</Card.Title>
                    </Col>
                </Row>

                <Row style={{ marginRight: -140 }}>
                    <Col>
                        <Card.Img variant='left' src={image} style={{ wqidth: '115px', maxHeight: '115px', marginTop: -40, marginLeft: 10 }} />
                    </Col>
                    <Col md={{ span: 5 }} style={{ marginLeft: -190, marginTop: -12 }}>
                        <Card.Body>
                            {firstBadges.length > 0 ? badgeChips : ""}
                        </Card.Body>
                    </Col>
                    <Col md={{ offset: 1 }} style={{ marginTop: -12, marginLeft: -50  }}>
                        <Card.Body>
                            <Rating name='recipeRating' value={rating} readOnly />
                        </Card.Body>
                    </Col>
                </Row>

                <Row style={{ marginTop: -45, marginRight: -350 }}>
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

export default RecipeCardShort;