import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../images/RecipeQuestLogo.png';
import profileIcon from '../../images/UserProfileIcon.png';
import listIcon from '../../images/ShoppingListIcon.png';
import profileIconTransparent from '../../images/UserProfileTransparent.png';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { useNavigate } from 'react-router-dom';
import { deleteUser } from './DeleteUserFirebase.jsx'
import { getData } from '../../components/create.jsx'
import RecipeCard from '../../components/recipeCard.jsx'


import burgerImage from '../../images/Default.jpg';

function ProfilePage() {

    const [email, setEmail] = React.useState('');
    const [userData, setUserData] = React.useState(null);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [privateProfile, setPrivate] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [firstRender, setFirstRender] = useState(true)
    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(false);

    const recipeBadges = ['Vegan', 'Vegetarian', 'Gluten Free', 'Dairy Free', 'Keto', 'Low Carb', 'Low Fat', 'Low Sodium', 'Low Sugar', 'Paleo', 'Pescatarian']

    const setFollow = async () => {
        const response = await fetch(`/api/users/follow/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "Follower": localStorage.getItem("userEmail"), "Followed": email }),
        });
        if (response.ok) {
            setIsFollowing(true)
        }
    }

    const removeFollow = async () => {
        const response = await fetch(`/api/users/removeFollowedUser/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "Email": localStorage.getItem("userEmail"), "FollowedUser": email }),
        });
        const data = await response.json();
        setIsFollowing(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            setEmail(localStorage.getItem("profileView"))
            const response = await fetch(`/api/users/email/` + localStorage.getItem("profileView"), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()

            if (response.ok) {
                setName(data["Name"])
                setUsername(data["Username"])
                setBio(data["Bio"])
                setEmail(data["Email"])
                setPrivate(data["Private"])
                if (data["Private"]) {
                    alert("This user's profile is private!")
                }
            } else {
                alert("Error retrieving data")
            }

            localStorage.removeItem("profileView")
        }
        const fetchRecipes = async () => {
            const response = await fetch(`/api/recipes/` + localStorage.getItem("profileView"), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()

            if (response.ok) {
                setRecipes(data)
            }
        }
        const fetchFollowed = async () => {

            const response = await fetch('/api/users/checkFollowing/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "Email": localStorage.getItem("userEmail"), "FollowedUser": localStorage.getItem("profileView") }),
            });
            const data = await response.json();

            if (response.status === 200) {
                setIsFollowing(true);
            }
            else if (response.status === 201) {
                setIsFollowing(false);
            }
            else {
                alert("Error Retrieving Followed Users");
            }
        }
        if (firstRender) {
            if (localStorage.getItem("profileView") != null) {
                fetchData()
            } else {
                navigate('/home')
            }
            fetchRecipes()
            fetchFollowed()
            setFirstRender(false)
        }
    }, [firstRender, email, navigate]);

    const toggleFollow = () => {
        if (!isFollowing) {
            setFollow()
        }
        else {
            removeFollow()
        }
    }




    return (
        <div>
            <nav>
                <Navbar
                    exapand='lg'
                    className='bg-body-tertiary'
                    fixed='top'
                    style={{
                        background:
                            'linear-gradient(90deg, #E74E36 0%, rgba(231, 78, 54, 0.43) 100%)',
                        height: '80px'
                    }}
                >
                    <Container style={{ marginLeft: -10 }}>
                        <Navbar.Brand href='/home'>
                            <img
                                src={logo}
                                alt=''
                                height='80px'
                                width='80px'
                                sticky='top'
                                className='d-inline-block align-top'
                            />
                        </Navbar.Brand>
                    </Container>
                    <Container style={{ marginLeft: '175vh' }}>
                        <Navbar.Brand href='/shopping-list'>
                            <img
                                src={listIcon}
                                alt=''
                                height='40px'
                                width='40px'
                                sticky='top'
                                className='d-inline-block align-top'
                            />
                        </Navbar.Brand>
                    </Container>
                    <Container style={{ marginLeft: -20 }}>
                        <Navbar.Brand href='/profile-page'>
                            <img
                                src={profileIcon}
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


            <Form style={{ marginTop: 300 }}>
                <Row className='Profile Information' style={{ marginTop: -100 }}>
                    <Form.Group as={Col} controlId='profilePicture' style={{ marginTop: -20 }}>
                        <img src={profileIconTransparent} alt='' width='100px' height='100px' />
                    </Form.Group>
                    <Form.Group as={Col} controlId='name' style={{ marginLeft: -200 }}>
                        <Form.Label>Username: {username}</Form.Label>
                    </Form.Group>

                    {!privateProfile ? <Form.Group as={Col} controlId='name' style={{ marginLeft: -70 }}>
                        <Form.Label>Name: {name}</Form.Label>
                        <Form.Control plaintext readOnly
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: 14,
                                width: '30vh',
                                marginTop: -30,
                            }} />

                        <Form.Control plaintext readOnly
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: 14,
                                width: '30vh',
                            }} />


                    </Form.Group> : ""}

                    {!privateProfile ? <Form.Group as={Col} controlId='email'>
                        <Form.Label>Email: {email}</Form.Label>
                        <Form.Control plaintext readOnly
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: 14,
                                width: '30vh'
                            }} />
                    </Form.Group> : ""}


                </Row>

            </Form>
            <Button
                variant="flat"
                style={{ width: '20vh', marginTop: 10 }}
                onClick={toggleFollow}
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>

            {!privateProfile ? <p style={{
                fontFamily: 'Roboto',
                fontSize: 14,
                overflowWrap: 'break-word',
                inlineSize: 200,
                justifyContent: 'center',
                width: '120vh'
            }}>Bio: {bio}</p> : ""}
            <ul style={{ marginTop: 20 }}>
                {recipes.length > 0
                    ? recipes.map((recipe, index) => (
                        <div key={index} style={{ marginBottom: 15 }}>
                            <RecipeCard
                                image={burgerImage}
                                title={recipe["Title"]}
                                rating={recipe["Rating"]}
                                badges={recipe["Tags"]}
                                width='50rem'
                                sourceUser={recipe["Poster"]}
                                email={recipe["PosterEmail"]}
                                id={recipe["_id"]} />
                        </div>
                    )) : <p style={{ marginLeft: -30 }}>No Recipes Yet!</p>
                }
            </ul>

        </div>
    );
}

export default ProfilePage;