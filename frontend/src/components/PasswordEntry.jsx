import React, { useState } from 'react';

function PasswordEntry(props) {
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        setPassword(e.target.value);
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    )
}

export default PasswordEntry;

