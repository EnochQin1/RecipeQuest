import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import logo from '../../images/RecipeQuestLogo.png';
import profileIcon from '../../images/UserProfileIcon.png';
import listIcon from '../../images/ShoppingListIcon.png';
import homeIcon from '../../images/home.png';
import NavBar from '../../components/navBar.jsx';
import Accordion from 'react-bootstrap/Accordion'
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import './recipesearch.css';
import RecipeCard from '../../components/recipeCard.jsx';
import burgerImage from '../../images/Default.jpg';

const buttonStyle = {
  backgroundColor: 'linear-gradient(90deg, #E74E36 0%, rgba(231, 78, 54, 0.43) 100%)',
  border: 'none',
  color: 'white',
  fontSize: '18px',
  padding: '10px 20px',
  margin: '10px',
};

const checkBoxIcon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;


function HomePage() {
  const [results, setResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [shownRecipes, setShownRecipes] = useState([]);
  const [filterIngredients, setFilterIngredients] = React.useState([]);
  const [filterMealType, setFilterMealType] = React.useState({
    Breakfast: false,
    Lunch: false,
    Dinner: false,
    Dessert: false,
    Other: false
  });
  const [filterNationality, setFilterNationality] = React.useState([]);
  const [filterDiets, setFilterDiets] = React.useState([]);
  const [filterTime, setFilterTime] = React.useState({
    '<30 min': false,
    '30-60 min': false,
    '1-2 hours': false,
    '>2 hours': false
  });
  const [filterServings, setFilterServings] = React.useState({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '>4': false
  });

  const [filterDifficulty, setFilterDifficulty] = React.useState({
    'Easy': false,
    'Medium': false,
    'Hard': false
  });

  const applyFilters = () => {

    const filteredResults = results.filter((recipe) => {
      if (filterIngredients.length > 0) {
        const recipeIngredients = recipe["Ingredients"].map((ingredient) => ingredient["Name"].toLowerCase());
        const selectedIngredients = filterIngredients.map((ingredient) => ingredient["name"].toLowerCase());
        for (const ingredient of selectedIngredients) {
          alert(ingredient)
          if (recipeIngredients.includes(ingredient)) {
            return false;
          }
        }
      }

      // Filter by meal type
      const mealTypes = Object.keys(filterMealType).filter((key) => {
        return filterMealType[key]
      })
      if (mealTypes.length > 0) {
        var match = false
        const recipeTags = recipe["Tags"].map((tags) => tags.toLowerCase());
        for (const key of mealTypes) {
          if (recipeTags.includes(key.toLowerCase())) {
            match = true
            break
          }
        }
        if (!match) {
          return false
        }
      }



      // Filter by nationality
      if (filterNationality.length > 0) {
        const recipeTags = recipe["Tags"].map((tag) => tag.toLowerCase());
        const nations = filterNationality.map((country) => country["name"].toLowerCase());
        var match = false
        for (const country of nations) {
          if (recipeTags.includes(country)) {
            match = true
            break
          }
        }
        if (!match) {
          return false
        }
      }

      // Filter by dietary restrictions
      if (filterDiets.length > 0) {
        const recipeTags = recipe["Tags"].map((tag) => tag.toLowerCase());
        const selectedDiets = filterDiets.map((diet) => diet["name"].toLowerCase());
        var match = false
        for (const diet of selectedDiets) {
          if (recipeTags.includes(diet)) {
            match = true
            break
          }
        }
        if (!match) {
          return false
        }
      }

      // Filter by total recipe time
      if (filterTime[recipe["CookTime"] + recipe["PrepTime"]]) {
        return false;
      }

      // Filter by number of servings
      if (filterServings[recipe["Servings"]]) {
        return false;
      }

      // Filter by difficulty
      if (filterDifficulty[recipe["Difficulty"]]) {
        return false;
      }

      return true; // Include the recipe if it passed all filter checks.
    });
    alert(filteredResults.length)
    setShownRecipes(filteredResults);
  };



  useEffect(() => {
    if (localStorage.getItem("Query") != null) {
      onSearch(localStorage.getItem("Query"))
      localStorage.removeItem("Query")
    }
  })

  const onSearch = async (Query) => {
    setResults([])
    const response = await fetch('api/recipes/search/' + Query, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (response.ok) {
      setResults(data)
      setShownRecipes(data)


    }
  }


  return (
    <div>
      <NavBar />

      <Grid container style={{ flexDirection: 'row', marginTop: 80, width: '100vw' }}>
        <Grid item xs={4} style={{
          minWidth: 250, maxWidth: 250, padding: 10,
          minHeight: '88.7vh', background: 'linear-gradient(90deg, rgba(231,78,54,0.8643790279783788) 0%, rgba(231,78,54,0.3) 0%)'
        }} >
          <h1 style={{ textAlign: 'center', fontFamily: 'Roboto', fontSize: 23, marginTop: 10 }}>Filters</h1>
          <Accordion defaultAftiveKey='0'>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Ingredients</Accordion.Header>
              <Accordion.Body>
                <Autocomplete
                  multiple
                  id='filter-ingredients'
                  options={exampleIngredients}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.name === value.name}
                  value={filterIngredients}
                  onChange={(event, value) => { setFilterIngredients(value) }}
                  renderOption={(props, option, { selected }) => (
                    <div {...props}>
                      <Checkbox
                        icon={checkBoxIcon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </div>
                  )}
                  style={{ width: 200, marginLeft: -8 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Ingredients" placeholder="" />
                  )}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='1'>
              <Accordion.Header>Meal Type</Accordion.Header>
              <Accordion.Body>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={filterMealType.Breakfast}
                      onChange={(event) => { setFilterMealType({ ...filterMealType, [event.target.name]: event.target.checked }) }}
                      name='Breakfast' />}
                    label='Breakfast'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterMealType.Lunch}
                      onChange={(event) => { setFilterMealType({ ...filterMealType, [event.target.name]: event.target.checked }) }}
                      name='Lunch' />}
                    label='Lunch'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterMealType.Dinner}
                      onChange={(event) => { setFilterMealType({ ...filterMealType, [event.target.name]: event.target.checked }) }}
                      name='Dinner' />}
                    label='Dinner'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterMealType.Dessert}
                      onChange={(event) => { setFilterMealType({ ...filterMealType, [event.target.name]: event.target.checked }) }}
                      name='Dessert' />}
                    label='Dessert'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterMealType.Other}
                      onChange={(event) => { setFilterMealType({ ...filterMealType, [event.target.name]: event.target.checked }) }}
                      name='Other' />}
                    label='Other'
                  />
                </FormGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='2'>
              <Accordion.Header>Nationality</Accordion.Header>
              <Accordion.Body>
                <Autocomplete
                  multiple
                  id='filter-nationality'
                  disableCloseOnSelect
                  options={exampleNationalities}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.name === value.name}
                  value={filterNationality}
                  onChange={(event, value) => { setFilterNationality(value) }}
                  renderOption={(props, option, { selected }) => (
                    <div {...props}>
                      <Checkbox
                        icon={checkBoxIcon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </div>
                  )}
                  style={{ width: 200, marginLeft: -8 }}
                  renderInput={(params) => (
                    <TextField {...params} label='Nationality' placeholder='' />
                  )}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='3'>
              <Accordion.Header>Dietary Restrictions</Accordion.Header>
              <Accordion.Body>
                <Autocomplete
                  multiple
                  id='filter-diets'
                  disableCloseOnSelect
                  options={exampleDietaryRestrictions}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.name === value.name}
                  value={filterDiets}
                  onChange={(event, value) => { setFilterDiets(value) }}
                  renderOption={(props, option, { selected }) => (
                    <div {...props}>
                      <Checkbox
                        icon={checkBoxIcon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </div>
                  )}
                  style={{ width: 200, marginLeft: -8 }}
                  renderInput={(params) => (
                    <TextField {...params} label='Dietary Restrictions' placeholder='' />
                  )}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='4'>
              <Accordion.Header>Total Recipe Time</Accordion.Header>
              <Accordion.Body>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={filterTime['<30 min']}
                      onChange={(event) => { setFilterTime({ ...filterTime, [event.target.name]: event.target.checked }) }}
                      name='<30 min' />}
                    label='<30 min'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterTime['30-60 min']}
                      onChange={(event) => { setFilterTime({ ...filterTime, [event.target.name]: event.target.checked }) }}
                      name='30-60 min' />}
                    label='30-60 min'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterTime['1-2 hours']}
                      onChange={(event) => { setFilterTime({ ...filterTime, [event.target.name]: event.target.checked }) }}
                      name='1-2 hours' />}
                    label='1-2 hours'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterTime['>2 hours']}
                      onChange={(event) => { setFilterTime({ ...filterTime, [event.target.name]: event.target.checked }) }}
                      name='>2 hours' />}
                    label='>2 hours'
                  />
                </FormGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='5'>
              <Accordion.Header>Number of Servings</Accordion.Header>
              <Accordion.Body>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={filterServings['1']}
                      onChange={(event) => { setFilterServings({ ...filterServings, [event.target.name]: event.target.checked }) }}
                      name='1' />}
                    label='1'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterServings['2']}
                      onChange={(event) => { setFilterServings({ ...filterServings, [event.target.name]: event.target.checked }) }}
                      name='2' />}
                    label='2'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterServings['3']}
                      onChange={(event) => { setFilterServings({ ...filterServings, [event.target.name]: event.target.checked }) }}
                      name='3' />}
                    label='3'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterServings['4']}
                      onChange={(event) => { setFilterServings({ ...filterServings, [event.target.name]: event.target.checked }) }}
                      name='4' />}
                    label='4'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterServings['>4']}
                      onChange={(event) => { setFilterServings({ ...filterServings, [event.target.name]: event.target.checked }) }}
                      name='>4' />}
                    label='>4'
                  />
                </FormGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='6'>
              <Accordion.Header>Difficulty</Accordion.Header>
              <Accordion.Body>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={filterDifficulty['Easy']}
                      onChange={(event) => { setFilterDifficulty({ ...filterDifficulty, [event.target.name]: event.target.checked }) }}
                      name='Easy' />}
                    label='Easy'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterDifficulty['Medium']}
                      onChange={(event) => { setFilterDifficulty({ ...filterDifficulty, [event.target.name]: event.target.checked }) }}
                      name='Medium' />}
                    label='Medium'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={filterDifficulty['Hard']}
                      onChange={(event) => { setFilterDifficulty({ ...filterDifficulty, [event.target.name]: event.target.checked }) }}
                      name='Hard' />}
                    label='Hard'
                  />
                </FormGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>


          <Container style={{ justifyContent: 'center', marginTop: 30, marginLeft: 35 }}>
            <Button variant='secondary' onClick={applyFilters} style={{ fontFamily: 'Roboto', fontSize: 16 }}>Apply Filters</Button>
          </Container>
        </Grid>

        <Grid item xs={8} style={{ flexGrow: '1', marginLeft: 30, marginTop: 25 }} >
          <Paper
            component='form'
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}>
            <InputBase
              sx={{ m1: 1, flex: 1, marginLeft: 2 }}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search for Recipes'
              inputProps={{ 'aria-label': 'Search for Recipes' }}
            />
            <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={() => onSearch(searchQuery)}>
              <SearchIcon />
            </IconButton>

          </Paper>
          <ul style={{ marginTop: 50 }}>
            {shownRecipes.length > 0
              ? shownRecipes.map((recipe, index) => (
                <div key={index} style={{ marginBottom: 15}}>
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
              )) : <p style={{ marginLeft: -30 }}>No matching results.</p>
            }
          </ul>
        </Grid>



      </Grid>


    </div>
  );
}

export default HomePage;

const exampleIngredients = [
  { name: 'Apple' },
  { name: 'Banana' },
  { name: 'Cinnamon' },
  { name: 'Flour' },
  { name: 'Sugar' },
  { name: 'Salt' },
  { name: 'Pepper' },
  { name: 'Eggs' },
  { name: 'Milk' },
  { name: 'Butter' },
  { name: 'Baking Soda' },
  { name: 'Baking Powder' },
  { name: 'Vanilla Extract' },
  { name: 'Chocolate Chips' },
  { name: 'Cocoa Powder' },
  { name: 'Peanut Butter' },
  { name: 'Oats' },
  { name: 'Rice' },
  { name: 'Chicken' },
  { name: 'Beef' },
  { name: 'Pork' },
  { name: 'Fish' },
  { name: 'Shrimp' },
];

const exampleNationalities = [
  { name: 'American' },
  { name: 'Chinese' },
  { name: 'French' },
  { name: 'Greek' },
  { name: 'Indian' },
  { name: 'Italian' },
  { name: 'Japanese' },
  { name: 'Korean' },
  { name: 'Mexican' },
  { name: 'Middle Eastern' },
  { name: 'Thai' },
  { name: 'Other' }
];

const exampleDietaryRestrictions = [
  { name: 'Vegetarian' },
  { name: 'Vegan' },
  { name: 'Gluten Free' },
  { name: 'Keto' },
  { name: 'Dairy Free' },
  { name: 'Pescatarian' },
  { name: 'Low Carb' },
  { name: 'Low Fat' },
  { name: 'Low Sodium' },
  { name: 'Low Sugar' },
  { name: 'High Protein' },
  { name: 'High Fiber' },
  { name: 'Other' },
]
