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
import Stack from '@mui/material/Stack';



import burgerImage from '../../images/Default.jpg';
const setCookie = (name, value) => {
    localStorage.setItem(name, value)
}
function ProfilePage() {

    const [email, setEmail] = React.useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [firstRender, setFirstRender] = useState(true);
    const [followers, setFollowers] = useState(0);

    const recipeBadges = ['Vegan', 'Vegetarian', 'Gluten Free', 'Dairy Free', 'Keto', 'Low Carb', 'Low Fat', 'Low Sodium', 'Low Sugar', 'Paleo', 'Pescatarian']

    const [isFollowing, setIsFollowing] = useState(false);

    const deleteAccount = async () => {
        deleteUser();
        navigate('/');
    }
    useEffect(() => {
        const fetchData = async () => {
            setEmail(localStorage.getItem("userEmail"))
            const response = await fetch(`/api/users/email/` + localStorage.getItem("userEmail"), {
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
                setFollowers(data["FollowerCount"])
            } else {
                alert("Error retrieving user")
            }
        }

        const fetchRecipes = async () => {
            const response = await fetch(`/api/recipes/` + localStorage.getItem("userEmail"), {
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

        if (firstRender) {
            fetchData()
            fetchRecipes()
            setFirstRender(false)
        }
        if (localStorage.getItem("userName") === null) {
            localStorage.setItem("userName", username)
        }
    }, []);




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

                    <Form.Group as={Col} controlId='name' style={{ marginLeft: -70 }}>
                        <Form.Label>Username: {username}</Form.Label>
                        <Form.Control plaintext readOnly
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: 14,
                                width: '30vh',
                                marginTop: -30,
                            }} />

                        <Form.Label>Name: {name}</Form.Label>
                        <Form.Control plaintext readOnly
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: 14,
                                width: '30vh',
                                marginTop: -30
                            }} />

                        <Form.Label>Followers: {followers}</Form.Label>
                        <Form.Control plaintext readOnly
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: 14,
                                width: '30vh',
                            }} />



                    </Form.Group>

                    <Form.Group as={Col} controlId='email'>
                        <Form.Label>Email: {email}</Form.Label>
                        <Form.Control plaintext readOnly
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: 14,
                                width: '30vh'
                            }} />
                    </Form.Group>

                    <Form.Group as={Col} controlId='Account Buttons' style={{ marginLeft: 350 }}>
                        <style type='text/css'>
                            {`
                                .btn-flat {
                                background-color: #EC7765;
                                color: white;
                                fontSize: 14;
                                fontFamily: Roboto;
                                }
                                `}
                        </style>
            
                        <Button style={{ width: '20vh', marginTop: 10 }}
                            variant='flat'
                            type='Edit Account'
                            href='/profile-page-edit'>Edit Account</Button>

                        <Button style={{ width: '20vh', marginTop: 10 }}
                            onClick={() => deleteAccount()}
                            variant='flat'
                            type='Delete Account'
                        >Delete Account</Button>
                    </Form.Group>

                </Row>

            </Form>

            <p style={{
                fontFamily: 'Roboto',
                fontSize: 14,
                overflowWrap: 'break-word',
                inlineSize: 200,
                justifyContent: 'center',
                width: '120vh'
            }}>Bio: {bio}</p>

            <Stack spacing = {5} direction = 'row'>
            <h2> Recipes</h2>

            <Button style={{ width: '20vh', marginTop: 3}}
                variant='flat'
                type='Add Recipe'
                href='/create-recipe'>Create Recipe</Button>

                <Button
                variant='flat'
                onClick={() => navigate('/following-recipes')}
                >
                View Following Recipes
                </Button>

                <Button 
                variant='flat'
                onClick={() => navigate('/saved-recipes')}
                >
                View Saved Recipes
                </Button>
            </Stack>

                
            <ul style={{ marginTop: 20}}>
                {recipes.length > 0
                    ? recipes.map((recipe, index) => (
                        <div key={index} style={{ marginBottom: 15 }}>
                            <RecipeCard
                                image={burgerImage}
                                title={recipe["Title"]}
                                badges={recipe["Tags"]}
                                width='50rem'
                                sourceUser={recipe["Poster"]}
                                email={recipe["PosterEmail"]}
                                id={recipe["_id"]}
                                rating={recipe["Rating"]["AverageRating"]} />
                        </div>
                    )) : <p style={{ marginLeft: -30}}>No Recipes Yet!</p>
                }
            </ul>
        </div>
    );
}

export default ProfilePage;