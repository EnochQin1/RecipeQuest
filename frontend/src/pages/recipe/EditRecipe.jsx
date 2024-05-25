import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import logo from '../../images/RecipeQuestLogo.png';
import profileIcon from '../../images/UserProfileIcon.png';
import listIcon from '../../images/ShoppingListIcon.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chip from '@mui/material/Chip';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Utensils from '../../images/Default.jpg';

import IngredientEntry from '../../components/ingredientEntry';
import IconButton from '@mui/material/IconButton';
import './createRecipe.css'
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import NavBar from '../../components/navBar.jsx';
import Popper from '@mui/material/Popper'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { Link } from 'react-router-dom';


function EditRecipe() {
  const [badgeList, setBadgeList] = useState([]);
  const [userBadge, setUserBadge] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [recipeDifficulty, setDifficulty] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [numServings, setNumServings] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(Utensils);
  const [imageError, setImageError] = useState('');
  const [Username, setUsername] = useState('')
  const [firstTime, setFirstTime] = useState(true);
  const [validated, setValidated] = useState(false);
  const [validDifficulty, setValidDifficulty] = useState(true);
  const [validIngredients, setValidIngredients] = useState(false);

  const [comments, setComments] = useState([])
  const [rating, setRating] = useState(null)

  const [originalTitle, setOriginalTitle] = useState('')
  const [originalDifficulty, setOriginalDifficulty] = useState('')
  const [originalServings, setOriginalServings] = useState('')
  const [originalCookTime, setOriginalCookTime] = useState('')
  const [originalPrepTime, setOriginalPrepTime] = useState('')
  const [originalInstructions, setOriginalInstructions] = useState('')
  const [originalTags, setOriginalTags] = useState('')
  const [originalIngredients, setOriginalIngredients] = useState('')

  const handleIngredientChange = (id, ingredient, quantity) => {
    const updatedIngredients = ingredients.map(ing => {
      if (ing.id === id) {
        if (!ing.validIngredient && ingredient != '') {
          ing.validIngredient = true;
        }
        if (!ing.validQuantity && quantity != '') {
          ing.validQuantity = true;
        }
        return { ...ing, ingredient, quantity };
      }
      return ing;
    });
    setIngredients(updatedIngredients);
  }

  const handleAddIngredient = () => {
    setIngredients(prevIngredients => [...prevIngredients, { id: Date.now(), ingredient: '', quantity: '', validIngredient: true, validQuantity: true }]);
  }

  const handleDeleteIngredient = (id) => {
    const filteredIngredients = ingredients.filter(ing => ing.id !== id);
    setIngredients(filteredIngredients);
  }

  const deleteBadge = (value) => () => {
    setBadgeList((badgeList) => badgeList.filter((userBadge) => userBadge !== value));
  }
  const addBadge = () => {
    if (userBadge.length > 0) {
      if (!badgeList.includes(userBadge)) {
        setBadgeList((badgeList) => badgeList.concat(userBadge));
      }
      setUserBadge('');
    }
  }

  const badges = badgeList.map((badge) => (
    <Chip
      label={badge}
      onDelete={deleteBadge(badge)}
      style={{ fontSize: 14, marginRight: '2px', width: 'auto' }}
    />
  ))

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file && !file.type.startsWith('image/')) {
      setImageError('Please upload a valid image file (e.g., jpeg, png, gif).');
      setRecipeImage(null);
      setImagePreview(null);
    } else {
      setRecipeImage(file);
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
      setImageError('');
    }
  };


  const [recipe, setRecipe] = useState({
    title: '',
    image: 'Default for now',
    categories: ['Category 1', 'Category 2'],
    ingredients: [
      { id: 1, ingredient: null, quantity: null },
    ],
  });



  const [updatedRecipe, setUpdatedRecipe] = useState({ ...recipe });


  const handleRecipeChange = (event) => {
    setValidated(true);
    var localValidIngredients = false;
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (recipeDifficulty === '') {
      setValidDifficulty(false);
    } else {
      setValidDifficulty(true);
    }
    if (ingredients.length > 0) {
      localValidIngredients = true; 
    }
    for (var i = 0; i < ingredients.length; i++) {
      if (ingredients[i].ingredient.length < 1) {
        ingredients[i].validIngredient = false;
        localValidIngredients = false;
      }
      else {
        ingredients[i].validIngredient = true;
      }
      if (ingredients[i].quantity.length < 1) {
        ingredients[i].validQuantity = false;
        localValidIngredients = false;
      }
      else {
        ingredients[i].validQuantity = true;
      }
    }
    const newIngredientList = [...ingredients];
    newIngredientList.push();
    setIngredients(newIngredientList);

    if (form.checkValidity() && validDifficulty && localValidIngredients) {
      onEdit();
    }
    else {
      if (!form.checkValidity() || !validDifficulty || (!localValidIngredients && ingredients.length > 0)) {
        alert("Please fill out all required fields")
      }
      else {
        alert("Please add ingredients")

      }
    }

  };

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(`/api/recipes/View/` + localStorage.getItem("RecipeId"), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUsername(data["Poster"])
        setRecipeTitle(data["Title"])
        setOriginalTitle(data["Title"])
        setPrepTime(data["PrepTime"])
        setOriginalPrepTime(data["PrepTime"])
        setCookTime(data["CookTime"])
        setOriginalCookTime(data["CookTime"])
        setNumServings(data["Servings"])
        setOriginalServings(data["Servings"])
        setDifficulty(data["Difficulty"])
        setOriginalDifficulty(data["Difficulty"])
        setInstructions(data["Instructions"])
        setOriginalInstructions(data["Instructions"])
        setBadgeList(data["Tags"])
        setOriginalTags(data["Tags"])
        setIngredients(data["Ingredients"].map((ingredient) => {
          return { id: ingredient["Identifier"], ingredient: ingredient["Name"], quantity: ingredient["Amount"] }
        }))
        setOriginalIngredients(data["Ingredients"])
        setComments(data["Comments"])
        setRating(data["Rating"])
      }
    }

    if (firstTime) {
      getRecipe()
      setFirstTime(false)
    }

  })

  const compareIngredients = (first, second) => {
    if (first.length != second.length) {
      return true
    }

    return true
  }

  const compareTags = (first, second) => {
    if (first.length != second.length) {
      return true
    }

    for (let i = 0; i <= first.length; i++) {
      if (first[i] != second[i]) {
        return true
      }
    }

    return false
  }

  const onEdit = async () => {

    //Also -> do not cast preptime and cooktime to a number -> it will cause an error 

    const response = await fetch('/api/recipes/id/' + localStorage.getItem("RecipeId"), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      alert("Problem editing recipe")
      return
    }

    var fields = {}
    fields["Title"] = recipeTitle
    fields["Poster"] = Username
    fields["Ingredients"] = ingredients
    fields["Tags"] = badgeList
    fields["Instructions"] = instructions
    fields["PrepTime"] = prepTime
    fields["CookTime"] = cookTime
    fields["Difficulty"] = recipeDifficulty
    fields["Servings"] = numServings
    fields["PosterEmail"] = localStorage.getItem("userEmail")
    fields["Comments"] = comments
    fields["Rating"] = rating

    const res = await fetch('api/recipes/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })

    const d = await res.json()

    if (!res.ok) {
      alert("Problem editing recipe")
    } else {
      alert("Recipe edited!")
      window.location.href = '/profile-page'
    }
    setValidated(true);
    //navigate('/profile-page')

  }

  return (
    <div>
      <NavBar />


      <Form noValidate validated={validated} onSubmit={handleRecipeChange} style={{ marginTop: 120, paddingBottom: 200 }}>
        <Row className='Header' >
          <Form.Group as={Col} controlId='recipeHeader'>
            <h1 style={{ fontFamily: 'Roboto', fontSize: 27 }}>Edit Recipe</h1>
          </Form.Group>

        </Row>

        <Row className='Recipe Title' >
          <Form.Group as={Col} controlId='recipeTitle' style={{ marginTop: 10 }}>
            <Form.FloatingLabel
              controlId='floatinginput'
              label='Recipe Title'
              className='recipeTitle'
            >
              <Form.Control
                style={{ fontSize: 16, fontFamily: 'Roboto', width: 350 }}
                type='text'
                placeholder='Recipe Title'
                value={recipeTitle}
                required
                onChange={(e) => setRecipeTitle(e.target.value)}
              />
            </Form.FloatingLabel>
          </Form.Group>
        </Row>

        <Row className='Image Header' style={{ marginTop: 20 }}>
          <Form.Group as={Col} controlId='imageHeader'>
            <h1 style={{ fontFamily: 'Roboto', fontSize: 24 }}>Upload Image</h1>
          </Form.Group>
        </Row>

        <Row className='Image Preview' style={{ marginTop: 20 }}>
          {imagePreview && (
            <Col>
              <img
                src={imagePreview}
                alt='Recipe Preview'
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  width: 'auto',
                  maxHeight: 600,
                  maxWidth: 800
                }}
              />
            </Col>
          )}
        </Row>

        <Row className='Recipe Image'>
          <Form.Group as={Col} controlId='recipeImage' style={{ marginTop: 20 }}>
            <Form.FloatingLabel
              controlId='floatinginput'
              label='Recipe Image'
              className='recipeImage'
            >
              <Form.Control
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
            </Form.FloatingLabel>
          </Form.Group>
        </Row>

        {imageError && (
          <Row className='Image Error' style={{ marginTop: 10, color: 'red' }}>
            <Col>
              {imageError}
            </Col>
          </Row>
        )}

        <Row className='Recipe Categories' style={{ marginTop: 20 }}>
          <Stack spacing={2} direction='col' sx={{ width: 'auto' }}>
            <Autocomplete
              style={{ fontSize: 14, fontFamily: 'Roboto', width: 200 }}
              freeSolo
              autoSelect
              id='category-autocomplete'
              label='Add Category'
              className='recipeCetagory'
              value={userBadge}
              onChange={(e, data) => setUserBadge(data)}
              PopperComponent={({ style, ...props }) => ( //makes menu always appear below text
                <Popper
                  {...props}
                  style={{ ...style, height: 0 }}
                />
              )}
              options={exampleCatagories.map((option) => option.name)}
              renderInput={(params) => (<TextField {...params} label='Add Category' value={params} />)}
            />
            <IconButton aria-label="add" onClick={addBadge} style={{ marginTop: 0, marginLeft: 10 }}>
              <AddIcon />
            </IconButton>

          </Stack>
        </Row>

        <Row className='Catagory List' style={{ marginTop: 10, marginLeft: -12 }}>
          <div className='horizontalScroll'>
            {badgeList.length > 0 ? badges : ""}
          </div>
        </Row>

        <Row className='Difficulty'>
          <Stack spacing={2.5
          } direction='row' style={{ withd: 'auto' }}>
            <div>
              <InputLabel id='difficulty-select-label' sx={{ fontSize: 17, fontFamily: 'Roboto' }}>Difficulty</InputLabel>
              <Select
                labelId='difficulty-select-label'
                id='difficulty-select'
                value={recipeDifficulty}
                label='Difficulty'
                onChange={(e) => setDifficulty(e.target.value)}
                error={!validDifficulty}
                sx={{ width: 200, fontSize: 16, fontFamily: 'Roboto' }}
              >
                <MenuItem value={'Easy'}>Easy</MenuItem>
                <MenuItem value={'Medium'}>Medium</MenuItem>
                <MenuItem value={'Hard'}>Hard</MenuItem>
              </Select>
            </div>

            <Form.FloatingLabel
              controlId='floatinginput'
              label='Number of Servings'
              className='recipeServings'
              style={{ marginTop: 23 }}>
              <Form.Control
                style={{ fontSize: 14, fontFamily: 'Roboto', width: 200 }}
                type='text'
                placeholder='4 servings'
                value={numServings}
                required
                onChange={(e) => setNumServings(e.target.value)}
              />
            </Form.FloatingLabel>
          </Stack>
        </Row>


        <Row className='Recipe Time' style={{ marginTop: 20 }}>
          <Stack spacing={2} direction='col' sx={{ width: 'auto' }}>
            <Form.FloatingLabel
              controlId='floatinginput'
              label='Prep Time (in minutes)'
              className='prepTime'
            >
              <Form.Control
                style={{ fontSize: 14, fontFamily: 'Roboto', width: 200 }}
                type='text'
                placeholder='20 minutes'
                value={prepTime}
                required
                onChange={(e) => setPrepTime(e.target.value)}
              />
            </Form.FloatingLabel>
            <Form.FloatingLabel
              controlid='floatinginput'
              label='Cook Time (in minutes)'
              className='cookTime'
              style={{ marginLeft: 20 }}
            >
              <Form.Control
                style={{ fontSize: 14, fontFamily: 'Roboto', width: 200 }}
                type='text'
                placeholder='20 minutes'
                value={cookTime}
                required
                onChange={(e) => setCookTime(e.target.value)}
              />
            </Form.FloatingLabel>
          </Stack>
        </Row>

        <Row className='Ingredient Header' style={{ marginTop: 60 }}>
          <Stack spacing={2} direction='col' sx={{ width: 'auto' }}>
            <h1 style={{ fontFamily: 'Roboto', fontSize: 24, marginTop: -40 }}>Ingredients</h1>
            <IconButton aria-label="add" onClick={handleAddIngredient} style={{ marginTop: -47, marginRight: 20 }}>
              <AddIcon />
            </IconButton>
          </Stack>

        </Row>

        <Row className='Ingredients' style={{ marginTop: 20 }}>
          <div className='ingredient-list'>
            {ingredients.map(ingredient => (
              <div key={ingredient.id} className='ingredient-entry'>
                <IngredientEntry
                  id={ingredient.id}
                  name={ingredient.ingredient}
                  amount={ingredient.quantity}
                  onValueChange={handleIngredientChange}
                  onDelete={handleDeleteIngredient}
                  validIngredient={ingredient.validIngredient}
                  validQuantity={ingredient.validQuantity}
                />
              </div>
            ))}
          </div>
        </Row>

        <Row className='Instructions Header'>
          <h1 style={{ fontFamily: 'Roboto', fontSize: 24 }}>Instructions</h1>
        </Row>

        <Row className='Instructions' style={{ marginTop: 10 }}>
          <Form.FloatingLabel
            controlId='floatingTextarea2'
            label='Instructions'
            className='recipeInstructions'>
            <Form.Control
              as='textarea'
              style={{ fontSize: 14, fontFamily: 'Roboto', width: 525, marginLeft: -10 }}
              placeholder='Placeholder Instructions'
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </Form.FloatingLabel>
        </Row>
        <Row className='submitButton' style={{ marginTop: 50, justifyContent: 'center' }}>

          <Button
            style={{ width: '30vh' }}
            variant='flat'
            type='submit'
          //href='/profile-page'
          >Update Recipe</Button>

        </Row>

        <Row className='submitButton' style={{ marginTop: 20, justifyContent: 'center' }}>
          <Button
            style={{ width: '30vh' }}
            variant='flat'
            type='createRecipe'
            //onClick={saveRecipe}
            href='/recipe-display'
          >Cancel</Button>
        </Row>

      </Form>


    </div>
  );
};


export default EditRecipe;

const exampleCatagories = [
  { name: 'Breakfast' },
  { name: 'Lunch' },
  { name: 'Dinner' },
  { name: 'Dessert' },
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
];

