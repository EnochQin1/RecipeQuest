import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import NavBar from '../../components/navBar.jsx';
import IngredientDisplay from '../../components/ingredientDisplay.jsx';
import IngredientEntry from '../../components/ingredientEntry.jsx';
import Hamburger from '../../images/Default.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chip from '@mui/material/Chip';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from '@mui/material/Stack';
import Utensils from '../../images/Default.jpg';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import './createRecipe.css';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import CommentDisplay from '../../components/commentDisplay.jsx';

function RecipeDisplay() {

  const [id, setId] = useState('')
  const [ownsProfile, setOwnsProfile] = useState(false)
  const [isFirst, setIsFirst] = useState(true)
  const [recipe, setRecipe] = useState({
    title: '',
    poster: '',
    ingredients: [],
    badges: [],
    difficulty: '',
    prepTime: '',
    cookTime: '',
    numServings: '',
    comments: []
  });
  const [userRating, setUserRating] = useState(0); //user's rating for recipe
  const [selectedRating, setSelectedRating] = useState(userRating); //temp rating value

  const setCookie = (name, value) => {
    localStorage.setItem(name, value);
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [passwordConfirmationRequired, setIsPasswordConfirmationRequired] = useState(false);
  const [openDialog, setOpen] = useState(false);
  const [openRatingDialog, setRatingOpen] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentDialog, setCommentDialog] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [replyDialog, setReplyDialog] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState('');
  const [recipeRating, setRecipeRating] = useState(0);

  const [username, setUsername] = useState("")

  const [saved, setSaved] = useState(false)

  const navigate = useNavigate();

  const onEdit = () => {
    localStorage.setItem("RecipeId", id)
    navigate('/edit-recipe')
  }

  const navigateProfile = (e) => {
    e.preventDefault();
    localStorage.removeItem("RecipeId")

    if (localStorage.getItem("userEmail") != recipe.posterEmail) {
      setCookie('profileView', recipe.posterEmail);
      window.location.href = '/view-profile-page';
    } else {
      window.location.href = '/profile-page';
    }
  }

  const toggleSaveRecipe = async () => {
    if (saved) {
      const response = await fetch(`/api/users/removeSaved/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "RecipeId": localStorage.getItem("RecipeId"),
          "Email": localStorage.getItem("userEmail")
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert("Recipe unsaved!")
        setSaved(false)
      } else {
        alert("Problem unsaving recipe")
      }
    } else {
      const response = await fetch(`/api/users/addSaved/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "RecipeId": localStorage.getItem("RecipeId"),
          "Email": localStorage.getItem("userEmail")
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert("Recipe saved!")
        setSaved(true)
      } else {
        alert("Problem saving recipe")
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/recipes/View/` + localStorage.getItem("RecipeId"), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setId(data["_id"])
        setRecipeRating(data["Rating"]["AverageRating"])
        setRecipe({
          ...recipe,
          title: data["Title"],
          poster: data["Poster"],
          posterEmail: data["PosterEmail"],
          ingredients: data["Ingredients"],
          badges: data["Tags"],
          difficulty: data["Difficulty"],
          prepTime: data["PrepTime"],
          cookTime: data["CookTime"],
          numServings: data["Servings"],
          instructions: data["Instructions"],
          rating: data["Rating"]["AverageRating"]
        });
        setEmail(data["PosterEmail"])
        setComments(data["Comments"])
        setOwnsProfile(data["PosterEmail"] === localStorage.getItem("userEmail"))
        getUserData(data["_id"]);
      } else {
        alert("Problem retrieving data");
      }
    }


    const getUserData = async (temp_id) => {
      const response = await fetch(`/api/users/email/` + localStorage.getItem("userEmail"), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (response.ok) {
        setUsername(data["Username"])
        for (const recipe of data["SavedRecipes"]) {
          if (recipe === localStorage.getItem("RecipeId")) {
            setSaved(true)
            break
          }
        }
        for (const rating of data["GivenRatings"]) {
          if (rating["RecipeId"] === temp_id) {
            setUserRating(rating["GivenRating"])
            break
          }
        }
      }
    }

    if (isFirst) {
      if (localStorage.getItem("RecipeId") != null) {
        fetchData()
        //getUserData()
        setIsFirst(false)
      } else {
        window.location.href = "/profile-page"
      }
    }

  })

  const onDelete = async () => {
    const response = await fetch('/api/recipes/id/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      alert("Problem deleting recipe")
    } else {
      alert("Recipe deleted!")
      localStorage.removeItem("RecipeId")
      window.location.href = '/profile-page'
    }
  }

  const handleClose = () => {
    setOpen(false);
    setPassword("");
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleConfirm = () => {
    confirmDelete();
    handleClose();
  }

  const handleRatingClose = () => {
    setRatingOpen(false);
  }

  const handleReplyPopupChange = (open) => {
    setReplyDialog(open);
  }

  const handleRatingOpen = () => {
    setRatingOpen(true);
    setSelectedRating(userRating);
  }

  const handleRatingDelete = async () => {
    setRatingOpen(false);
    setSelectedRating(0);
    setUserRating(0);
    //delete rating from recipe
    const response = await fetch('/api/users/deleteRating/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "Email": localStorage.getItem("userEmail"), "RecipeId": id })
    })
    const data = await response.json();
    if (response.ok) {
      setRecipeRating(data["Rating"]["AverageRating"])
    }
  }

  const handleRatingConfirm = async () => {
    setRatingOpen(false);
    setUserRating(selectedRating);
    //add selected rating to recipe
    var fields = {}
    fields["RecipeId"] = id
    fields["GivenRating"] = selectedRating;
    const response = await fetch('/api/users/addRating/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "Email": localStorage.getItem("userEmail"), "Rating": fields })
    })
    const data = await response.json();
    if (response.ok) {
      setRecipeRating(data["Rating"])
    }
  }

  const handleRatingCancel = () => {
    setRatingOpen(false);
    setSelectedRating(userRating);
  }

  const handleCommentClose = () => {
    setCommentDialog(false);
    setNewComment('');
  }

  const handleCommentOpen = () => {
    setCommentDialog(true);
  }

  const handleCommentConfirm = async () => {
    //add comment to recipe
    var fields = {}
    fields["RecipeId"] = id
    fields["Post"] = newComment
    fields["Poster"] = {}
    fields["Poster"]["Email"] = localStorage.getItem("userEmail")
    fields["Poster"]["Username"] = username
    const response = await fetch('/api/recipes/addComment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })

    const data = await response.json();
    if (response.ok) {
      setComments(data["Comments"])
    }
    handleCommentClose();
  }

  const handleReplyClose = () => {
    setReplyDialog(false);
    setNewReply('');
  }

  const handleReplyOpen = () => {
    setReplyDialog(true);
  }

  const handleReplyConfirm = async () => {
    //add reply to recipe  **I need the id of the comment the reply is for
    var reply = {}
    reply["Comment"] = newReply
    reply["Poster"] = {
      "Email": localStorage.getItem("userEmail"),
      "Username": username //prob for me to figure out
    }
    const response = await fetch('/api/recipes/addReply/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "RecipeId": id,
        "PostId": currentCommentId, //Should go here, ideally if you can pass it as a variable to this function
        "Reply": reply
      })
    })
    const data = await response.json();
    if (response.ok) {
      setComments(data["Comments"])
    }
    handleReplyClose();
  }
  // add to shopping list
  const addToShoppingList = async () => {
    const response = await fetch('/api/users/addToShoppingList/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Email": localStorage.getItem("userEmail"),
        "Ingredients": recipe.ingredients
      })
    })
    if (response.ok) {
      alert("Ingredients added to shopping list!")
    } else {
      alert("Problem adding ingredients to shopping list")
    }
  }

  const confirmDelete = async () => {
    if (password != '') {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          onDelete()
        })
        .catch(() => {
          alert("Incorrect Password")
        })
    } else {
      alert("Enter password to confirm delete")
    }
  };

  return (
    <div>
      <NavBar />

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Confirm Recipe Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your password to confirm deletion of this recipe.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant='standard'
            type='password'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRatingDialog} onClose={handleRatingClose}>
        <DialogTitle>Add Recipe Rating</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click on the starts to select a rating
          </DialogContentText>
          <Rating name='selectRating' value={selectedRating} precision={1} onChange={(event, newValue) => { setSelectedRating(newValue); }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRatingCancel}>Cancel</Button>
          {userRating != 0 ? <Button onClick={handleRatingDelete}>Delete Rating</Button> : ""}
          <Button onClick={handleRatingConfirm}>{userRating == 0 ? "Confirm" : "Update Rating"} </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={commentDialog} onClose={handleCommentClose}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your comment below.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label='Comment'
            multiline
            maxRows={6}
            variant='standard'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCommentClose}>Cancel</Button>
          <Button onClick={handleCommentConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={replyDialog} onClose={handleReplyClose}>
        <DialogTitle>Add Reply</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your reply below.
          </DialogContentText>

          <TextField
            autoFocus
            margin='dense'
            label='Reply'
            multiline
            maxRows={6}
            variant='standard'
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReplyClose}>Cancel</Button>
          <Button onClick={handleReplyConfirm}>Confirm</Button>
        </DialogActions>

      </Dialog>

      <div style={{ marginTop: 120, paddingBottom: 200 }}>
        <Row className='Recipe Title' >
          <Col>
            <Form.Group as={Col} controlId='recipeTitle'>
              <h1 style={{ fontFamily: 'Roboto', fontSize: 35, maxWidth: 240, minWidth: 240 }}>{recipe.title}</h1>
            </Form.Group>
          </Col>

          <Col style={{ marginLeft: 300 }}>
            <Rating name='read-only' style={{ marginTop: 10, marginLeft: 13 }} value={recipeRating} precision={0.5} readOnly />
          </Col>
        </Row>

        <Row className='Recipe Poster' style={{ marginTop: 10 }}>
          <Col>
            <a onClick={navigateProfile} style={{ fontFamily: 'Roboto', fontSize: 15, cursor: 'pointer' }}>Uploaded by: {recipe.poster}</a>
          </Col>
          <Col style={{ marginLeft: 300 }}>
            {ownsProfile ? (
              <Button style={{ width: 150 }} variant='flat' type='Edit Recipe' onClick={onEdit}>Edit Recipe</Button>
            ) : <Button style={{ width: 150 }} variant='flat' type='Add Rating' onClick={handleRatingOpen}>{userRating == 0 ? "Add Rating" : "Edit Rating"}</Button>}
          </Col>
        </Row>

        <Row className='Recipe Catagories' style={{ marginTop: 20 }}>
          <Col>
            <div className='horizontalScroll' style={{ minWidth: 300 }}>
              {recipe.badges.length > 0 ? recipe.badges.map((badge) => (
                <Chip
                  label={badge}
                  style={{ fontSize: 14, marginRight: '2px', width: 'auto' }}
                />
              )) : ""}
            </div>
          </Col>

          <Col style={{ marginLeft: 188 }}>
            {ownsProfile ? (
              <Button style={{ width: 150 }}
                variant='flat'
                type='Edit Recipe'
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  handleOpen();
                }}
              >Delete Recipe</Button>
            ) : <Button style={{ width: 150 }}
              variant='flat'
              type='Edit Recipe'
              onClick={(e) => {
                e.preventDefault();
                toggleSaveRecipe();
              }}>{saved ? "Unsave Recipe" : "Save Recipe"}</Button>
            }
          </Col>
        </Row>

        <Row className='Image Preview' style={{ marginTop: 20 }}>
          <Col>
            <img
              src={Hamburger}
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
        </Row>

        <Row className='Difficulty' style={{ marginTop: 40 }}>
          <Col>
            <p style={{ fontFamily: 'Roboto', fontSize: 25 }}>Difficulty: {recipe.difficulty}</p>
          </Col>
          <Col style={{ marginLeft: -300 }}>
            <p style={{ fontFamily: 'Roboto', fontSize: 25 }}>Number of Servings: {recipe.numServings}</p>
          </Col>
        </Row>

        <Row className='Time' style={{ marginTop: 20 }}>
          <Col>
            <p style={{ fontFamily: 'Roboto', fontSize: 25 }}>Prep Time: {recipe.prepTime}</p>
          </Col>
          <Col style={{ marginLeft: -300 }}>
            <p style={{ fontFamily: 'Roboto', fontSize: 25 }}>Cook Time: {recipe.cookTime}</p>
          </Col>
        </Row>

        <Row className='ingredientHeader' style={{ marginTop: 50 }} >
          <Col>
            <h1 style={{ fontFamily: 'Roboto', fontSize: 30 }}>Ingredients:</h1>
          </Col>
          <Col style={{ marginLeft: -390, marginTop: -12 }}>
            <Button style={{ width: 150 }} variant='flat' type='Edit Recipe' onClick={addToShoppingList}>Add Ingredients to Shopping List</Button>
          </Col>
        </Row>

        <Row className='ingredients' style={{ marginTop: 20 }} >
          <Col>
            <div className='ingredient-list'>
              {recipe.ingredients.map((ingredient) => (
                <div key={ingredient.id} className='ingredient-entry'>
                  <IngredientDisplay
                    ingredient={ingredient["Name"]}
                    quantity={ingredient["Amount"]}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>

        <Row className='Instructions Header' style={{ marginTop: 40 }} >
          <Col>
            <h1 style={{ fontFamily: 'Roboto', fontSize: 30 }}>Instructions:</h1>
          </Col>
        </Row>

        <Row className='instructions' style={{ marginTop: 20 }} >
          <Col>
            <p style={{
              fontFamily: 'Roboto', fontSize: 20, overflowWrap: 'break-word',
              inlineSize: 800,
              whiteSpace: 'pre-line'
            }}>{recipe.instructions}</p>
          </Col>
        </Row>

        <Row style={{ marginTop: 75 }}>
          <Col>
            <h1 style={{ fontFamily: 'Roboto', fontSize: 35, }} >Comments</h1>
          </Col>
          <Col>
            <Button onClick={handleCommentOpen} style={{ width: 150, marginTop: 4, marginLeft: -220 }} variant='flat' type='Add Comment'>Add Comment</Button>
          </Col>

        </Row>
        <Row style={{ marginTop: 20, marginLeft: 5 }}>
          <Col>
            {comments.length > 0 ? comments.map((comment) => (
              <CommentDisplay replyList={comment["Replies"]} user={comment["Poster"]["Username"]} date={comment["createdAt"]} email={comment["Poster"]["Email"]} comment={comment["Comment"]} id={comment['_id']} openPopup={handleReplyOpen} setCommentId={setCurrentCommentId} />
            )) : "No Comments Yet"}
          </Col>
        </Row>

      </div>
    </div>
  );
}

export default RecipeDisplay;
