import React from 'react';
import Card from 'react-bootstrap/Card';
import Stack from '@mui/material/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import ReplyDisplay from './replyDisplay';

const CommentDisplay = ({ replyList, user, date, email, comment, openPopup, id, setCommentId }) => {
    const setCookie = (name, value) => {
        localStorage.setItem(name, value);
    }

    const createReply = () => {
        setCommentId(id);
        openPopup();
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
    var commentDate = "";
    if (date != undefined) {
        commentDate = date.substring(5, 7) + '-' + date.substring(8, 10) + '-' + date.substring(0, 4);
    }

    return (
        
        <div style={{ marginBottom: 25}}>
            <Card style={{ width: 400, height: 'auto' }}>
                <ListGroup variant='flush'>
                    <ListGroup.Item style={{ maxHeight: 40, backgroundColor: 'rgba(231, 78, 54, 0.35)', fontSize: 20, }}>
                        <Stack spacing={1} direction='row' style={{ width: 'auto', marginTop: -5 }}>
                            <a style={{ cursor: 'pointer' }} onClick={navigateProfile}>
                                <p>{user}</p>
                            </a>
                            <p style={{ color: 'rgba(77, 77, 77, 0.6)' }}>{commentDate}</p>
                        </Stack>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p style={{ overflowWrap: 'break-word' }}>{comment}</p>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ height: 30 }}>
                        <a style={{ cursor: 'pointer', fontFamily: 'Roboto', fontSize: 14 }} onClick={createReply}>
                            <p style={{ marginTop: -3 }}>Add Reply</p>
                        </a>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
            <div style={{ marginLeft: 40, marginTop: 20 }}>
                {replyList.map((reply) => (
                    <ReplyDisplay reply={reply["Comment"]} user={reply["Poster"]["Username"]} date={reply["createdAt"]} email={reply["Poster"]["Email"]} style={{ marginBottom: 15 }}/>
                ))}
            </div>
        </div>
    )
}

export default CommentDisplay;

