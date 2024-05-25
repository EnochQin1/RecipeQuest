const express = require("express")
const {
    testMessage,
    createRecipe,
    getAllRecipes,
    deleteRecipe,
    getRecipesByUser,
    searchForRecipe,
    getViewRecipe,
    //updateRecipe,
    addComment,
    deleteComment,
    editComment,
    addReply,
    editReply,
    deleteReply
} = require('../controllers/recipeController');
const { route } = require("./users.routes");

const router = express.Router()

router.get('/test', testMessage);

router.post('/', createRecipe);

router.get('/', getAllRecipes);

router.delete('/id/:id', deleteRecipe)

router.get('/View/:id', getViewRecipe)

router.get('/:PosterEmail', getRecipesByUser);

router.get('/search/:Query', searchForRecipe)

//router.patch('/:id', updateRecipe)

router.post('/addComment/', addComment)

router.patch('/editComment/', editComment)

router.delete('/deleteComment/', deleteComment)

router.post('/addReply/', addReply)

router.patch('/editReply/', editReply)

router.delete("/deleteReply/", deleteReply)

module.exports = router