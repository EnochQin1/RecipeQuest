import React, { useState } from 'react';

function EmailEntry(width, height, left, top, position) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    const handleSubmit = () => {
        if (validateEmail(email)) {
            setError('');
            //remove once server has been connected
            console.log('Email is valid:', email);
            //send email to backend
        } else {
            setError('Please enter a valid email address');
        }
    }

    return (
        <div>
            <input
            style={{
            width: '100%',
            lineHeight: '28px',
            paddingLeft: '8px',
            borderRadius: 40, 
            border: '1px #6F6F6F solid',
            color: '#6F6F6F',
            fontSize: 19,
            fontFamily: 'Roboto',
            fontWeight: '400',
            letterSpacing: 0.42,
            wordWrap: 'break-word' 
            }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
    )
}

export default EmailEntry;