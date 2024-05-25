import React from 'react';
import Card from 'react-bootstrap/Card';
import Stack from '@mui/material/Stack';
import ListGroup from 'react-bootstrap/ListGroup';

const ReplyDisplay = ({ reply, user = 'testUser', date, email, style, openPopup}) => {
    const setCookie = (name, value) => {
        localStorage.setItem(name, value);
    }



    const navigateProfile = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (localStorage.getItem('userEmail') != email) {
            setCookie('profileView', email);
            window.location.href = '/view-profile-page';
        } else {
            window.location.href = '/profile-page';
        }
    };

    const backgroundColor = 'rgba(0, 0, 0, 0.0)' ;

    var commentDate = "";
    if (date != undefined) {
        commentDate = date.substring(5, 7) + '-' + date.substring(8, 10) + '-' + date.substring(0, 4);
    }

    return (
    <div style={style}>
        <Card style={{ width: 400, height: 'auto' }}>
            <ListGroup variant="flush">
                <ListGroup.Item style={{ maxHeight: 40, backgroundColor: backgroundColor, fontSize: 20, }}>
                    <Stack spacing={1} direction='row' style={{ width: 'auto', marginTop: -5}}>
                        <a style={{ cursor: 'pointer' }} onClick={navigateProfile}>
                            <p>{user}</p>
                        </a>
                        <p style={{ color: 'rgba(77, 77, 77, 0.6)'}}>{commentDate}</p>
                    </Stack>
                    </ListGroup.Item>
                <ListGroup.Item>
                    <p style={{overflowWrap: 'break-word'}}>{reply}</p>
                </ListGroup.Item>
                </ListGroup>
        </Card>
    </div>


    )
}

export default ReplyDisplay;