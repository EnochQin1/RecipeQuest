const express = require('express');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, String(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})
const {
    testMessage,
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    getUserByEmail,
    updateUserByEmail,
    deleteUserByEmail,
    searchForUser,
    addSavedRecipe,
    removeSavedRecipe,
    getSavedRecipes,
    addRating,
    deleteRating,
    addToShoppingList,
    getShoppingList,
    setFollowing,
    visitRecipe,
    getHomeRecipes,
    emptyShoppingList,
    editedShoppingList,
    getFollowedUsers,
    removeFollowedUser,
    getFollowingRecipes,
    checkFollowing
} = require('../controllers/userController')


const router = express.Router();

//Send a test message
router.get('/test', testMessage);

//Create a new user
router.post('/', createUser);

router.post('/follow/', setFollowing)

//Get all users *temporary, don't think we want this in final product*
router.get('/', getAllUsers);

//Get a user by id
router.get('/id/:id', getUser);
router.patch('/addToShoppingList/', addToShoppingList)
router.patch('/getShoppingList/:email', getShoppingList)
//Get a user by email
router.get('/email/:email', getUserByEmail)

//Delete a user by id
router.delete('/id/:id', deleteUser);

router.delete('/email/:email', deleteUserByEmail)

//Update a user
router.patch('/data/:id', updateUser);
router.patch('/image/:id', upload.single('productImage'), updateUserByEmail);

//Update a user by email
router.patch('/emailData/:email', updateUserByEmail)
router.patch('/emailImage/:email', upload.single('productImage'), updateUserByEmail);

router.get('/search/:Query', searchForUser)

router.post('/addSaved/', addSavedRecipe)

router.post('/removeSaved/', removeSavedRecipe)

router.get('/getSavedRecipes/:Email', getSavedRecipes)

//Use for adding and editing ratings
router.post('/addRating/', addRating)

router.delete('/deleteRating/', deleteRating)


router.post('/visitRecipe/', visitRecipe)

router.get('/getHomeRecipes/:Email', getHomeRecipes)

router.patch('/deleteShoppingList/', emptyShoppingList)

router.patch('/editedShoppingList/', editedShoppingList)

router.get('/getFollowedUsers/:email', getFollowedUsers)

router.patch('/removeFollowedUser/', removeFollowedUser)

router.patch('/getFollowingRecipes/', getFollowingRecipes)

router.patch('/checkFollowing/', checkFollowing)

module.exports = router;