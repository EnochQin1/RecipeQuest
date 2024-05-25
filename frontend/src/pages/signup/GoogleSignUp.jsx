import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../images/RecipeQuestLogo.png';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import { handleGoogleSignUp } from './FirebaseSignUp';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import {createUser} from '../../components/create.jsx'
import { useNavigate } from 'react-router-dom';
function GoogleSignUp() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const createAccountWithGoogle = async () => {
        try {
            const email = firebase.auth().currentUser.email;
            createUser(username, name, email, "", true, false);

            navigate('/home')
        }
        catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <nav>
                <Navbar expand='lg' className='bg-body-tertiary' fixed='top'
                    style={{
                        background: 'linear-gradient(90deg, #E74E36 0%, rgba(231, 78, 54, 0.43) 100%)',
                        height: '80px',
                    }}>
                    <Container
                        style={{ marginLeft: -10 }}>
                        <Navbar.Brand href='/'>
                            <Image
                                src={logo}
                                alt=''
                                height='80px'
                                width='80px'
                                sticky='top'
                                className='d-inline-block align-top'
                            />
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </nav>

            <div
                style={{
                    marginTop: '200px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }} >
                <h1 style={{ fontFamily: 'Roboto', fontSize: 32, marginBottom: 40, marginTop: -35 }}>Enter Additional Details</h1>
                <FloatingLabel
                    style={{
                        marginBottom: 10,
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        width: '30vh'
                    }}
                    controlId='floatingInput'
                    label='Name'
                    className='name'
                >
                    <Form.Control type='Name' placeholder='Basic Name' value={name} onChange={(e) => setName(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    style={{
                        marginBottom: 10,
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        width: '30vh'
                    }}
                    controlId='floatingInput'
                    label='Username'
                    className='username'
                >
                    <Form.Control
                        type='Username'
                        placeholder='Basic Username'
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                </FloatingLabel>

                <style type='text/css'>
                    {`
                  .btn-flat {
                  background-color: #EC7765;
                  color: white;
                  fontSize: 16;
                  fontFamily: Roboto;
                  }
                  `}
                </style>
                <Button
                    style={{ width: '30vh', marginTop: 20, flexDirection: 'row', flexWrap: 'nowrap' }}
                    onClick={createAccountWithGoogle}
                    variant='flat'
                    type="submit">Create Account</Button>{' '}
            </div>
        </div>
    );
}

export default GoogleSignUp;