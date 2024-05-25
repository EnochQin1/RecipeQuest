import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from '../../images/RecipeQuestLogo.png';
import profileIcon from '../../images/UserProfileIcon.png';
import listIcon from '../../images/ShoppingListIcon.png';
import NavBar from '../../components/navBar.jsx';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import RecipeCard from '../../components/recipeCard.jsx';
import burgerImage from '../../images/Default.jpg';
import RecipeCardShort from '../../components/recipeCardShort.jsx';


const buttonStyle = {
  backgroundColor: 'linear-gradient(90deg, #E74E36 0%, rgba(231, 78, 54, 0.43) 100%)',
  border: 'none',
  color: 'white',
  fontSize: '18px',
  padding: '10px 20px',
  margin: '10px',
};

function HomePage() {
  const [searchText, setSearchText] = React.useState('Discover Recipes');
  const [searchQuery, setSearchQuery] = React.useState('')
  const [alignment, setAlignment] = React.useState('recipes')
  const [recipeHistory, setRecipeHistory] = React.useState([]);
  const [featuredRecipe, setFeaturedRecipe] = React.useState(null);
  const [isFirst, setIsFirst] = React.useState(true)


  const navigate = useNavigate()

  const search = (event) => {
    event.preventDefault();
    localStorage.setItem("Query", searchQuery)
    if (searchText === 'Discover Recipes') {
      navigate("/search")
    } else {
      navigate("/user-search")
    }
  }

  const handleToggleChange = (event, newAlignment) => {
    setAlignment(newAlignment);

    if (newAlignment === 'recipes') {
      setSearchText('Discover Recipes')
    } else {
      setSearchText('Discover Chefs')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users/getHomeRecipes/` + localStorage.getItem("userEmail"), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json();

      if (response.ok) {
        setRecipeHistory(data["RecentRecipes"])
        setFeaturedRecipe(data["RecommendedRecipe"])
      }
    }

    if (isFirst) {
      setIsFirst(false)
      fetchData()
    }
  })

  return (
    <div style={{ paddingBottom: 80}}>
      <NavBar />
      <Row>
      <Container style={{ marginTop: 110, textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Roboto', fontSize: 32 }}>Welcome to RecipeQuest!</h1>
        <p style={{ fontFamily: 'Roboto', fontSize: 17 }}>Discover new recipes, manage your shopping list, or interact with other chefs.</p>
        <Link to='/about' style={{ fontFamily: 'Roboto', fontSize: 18 }}>About Us</Link>
      </Container>


      <Container style={{ marginTop: 45, display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
        <Paper
          onSubmit={search}
          component='form'
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}>
          <InputBase
            sx={{ m1: 1, flex: 1, marginLeft: 2 }}
            placeholder={searchText}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputProps={{ 'aria-label': { searchText } }}
          />
          <IconButton sx={{ p: '10px' }} aria-label='search' onClick={search}>
            <SearchIcon />
          </IconButton>

        </Paper>
      </Container>

      <Container style={{ marginTop: 15, textAlign: 'center' }}>
        <ToggleButtonGroup
          color='primary'
          value={alignment}
          exclusive
          onChange={handleToggleChange}
          aria-label='select-search'
        >

          <ToggleButton value='recipes'>Recipes</ToggleButton>
          <ToggleButton value='chefs'>Chefs</ToggleButton>
        </ToggleButtonGroup>
      </Container>
      
      </Row>

      <Row>
      <Container style={{ marginTop: 40, textAlign: 'center' }}>
        <Button
          variant='flat'
          onClick={() => navigate('/following-recipes')}
        >
          View Following Recipes
        </Button>
      </Container>
      </Row>

      <Row style={{ marginTop: 40 }}>
        <Col>
          <h1 style={{ fontFamily: 'Roboto', fontSize: 28, marginLeft: 200 }}>Featured Recipes</h1>
          <ul style={{ marginTop: 15 }}>
            {featuredRecipe !== null ?
              <div>
                <RecipeCardShort
                  image={burgerImage}
                  title={featuredRecipe["Title"]}
                  rating={featuredRecipe["Rating"]["AverageRating"]}
                  badges={featuredRecipe["Tags"]}
                  sourceUser={featuredRecipe["Poster"]}
                  email={featuredRecipe["PosterEmail"]}
                  id={featuredRecipe["_id"]} />
              </div>
              : <p>No Featured Recipes</p>
            }
          </ul>
        </Col>

        <Col>
          <h1 style={{ fontFamily: 'Roboto', fontSize: 28, marginLeft: 200 }}>Jump Back In</h1>
          <ul style={{ marginTop: 15 }}>
            {recipeHistory.length > 0 ?
              recipeHistory.map((recipe, index) => (
                <div key={index} style={{ marginBottom: 15 }}>
                  <RecipeCardShort
                    image={burgerImage}
                    title={recipe["Title"]}
                    rating={recipe["Rating"]["AverageRating"]}
                    badges={recipe["Tags"]}
                    sourceUser={recipe["Poster"]}
                    email={recipe["PosterEmail"]}
                    id={recipe["_id"]} />
                </div>
              )) : <p style={{ marginLeft: 155 }}>No Recently Visited Recipes</p>}
          </ul>
        </Col>
      </Row>

    </div>
  );
}

export default HomePage;