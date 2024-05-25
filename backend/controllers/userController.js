const { User, GivenRating } = require('../models/users.model')
const { Recipe, Rating } = require('../models/recipes.model')
const mongoose = require('mongoose')


//Send test message
const testMessage = async (req, res) => {
    res.send('User route testing!')
}

//Create a new user
const createUser = async (req, res) => {
    const { Username, Name, Email, Bio, GoogleAccount } = req.body
    try {
        const user = await User.create({ Username, Name, Email, Bio, GoogleAccount, SavedRecipes: [] })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Get all users
const getAllUsers = async (req, res) => {
    //sorts by most recently created
    const users = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(users)
}

//Get user by id
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid user id' })
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}

//Get user by email
const getUserByEmail = async (req, res) => {
    const { email } = req.params

    const user = await User.findOne({ Email: email })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}

//Delete a user by id
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid user id' })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}

//Delete a user by email
const deleteUserByEmail = async (req, res) => {
    const { email } = req.params

    const user = await User.findOneAndDelete({ Email: email })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}

//Update a user
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid user id' })
    }

    if ("Image" in req.body) {
        req.body["Image"] = req.file.path
        console.log(req.file)
    }

    const user = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}

//Update a user by email
const updateUserByEmail = async (req, res) => {
    const { email } = req.params

    if ("Image" in req.body) {
        req.body["Image"] = req.file.path
        console.log(req.file)
    }

    const user = await User.findOneAndUpdate({ Email: email }, {
        ...req.body
    })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}

const searchForUser = async (req, res) => {
    const { Query } = req.params

    const users = await User.find({ Username: { $regex: Query, $options: 'i' } })

    if (users.length === 0) {
        return res.status(404).json({ error: 'No matching users' })
    }

    res.status(200).json(users)
}

const addSavedRecipe = async (req, res) => {
    const { Email, RecipeId } = req.body

    if (!mongoose.Types.ObjectId.isValid(RecipeId)) {
        return res.status(404).json({ error: 'Invalid recipe id: ' + RecipeId })
    }

    const user = await User.findOne({ Email: Email })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    if (!('SavedRecipes' in user)) {
        user['SavedRecipes'] = []
    }

    if (!user['SavedRecipes'].includes(RecipeId)) {
        user['SavedRecipes'].push(RecipeId)
        user.save()
    }

    res.status(200).json(user)
}

const removeSavedRecipe = async (req, res) => {
    const { Email, RecipeId } = req.body

    const user = await User.findOne({ Email: Email })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }
    //Currently breaks if recipeid is not in the list, idk why
    if (user["SavedRecipes"].includes(RecipeId)) {
        user["SavedRecipes"].splice(user["SavedRecipes"].indexOf(RecipeId), 1)
        user.save()
    } else {
        return res.status(304)
    }

    res.status(200).json(user)
}

const getSavedRecipes = async (req, res) => {
    const { Email } = req.params

    const user = await User.findOne({ Email: Email })

    if (!user) {
        return res.status(404).json({ error: "No such user: " + Email })
    }

    var saved = []
    for (const recipeId of user["SavedRecipes"]) {
        const recipe = await Recipe.findById(recipeId)
        if (recipe) {
            saved.push(recipe)
        }
    }

    res.status(200).json({ "Saved": saved })
}

//Use for adding and editing ratings
const addRating = async (req, res) => {
    const { Email, Rating } = req.body

    if (!("GivenRating" in Rating)) {
        return res.status(422).json({ error: "Improper data input" })
    }

    const user = await User.findOne({ Email: Email })

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }

    const recipe = await Recipe.findById(Rating["RecipeId"])

    if (!recipe) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    var found = false

    if (!("GivenRatings" in user)) {
        user["GivenRatings"] = []
    }

    user["GivenRatings"].forEach((gr) => {
        if (gr["RecipeId"].toString() === Rating["RecipeId"]) {
            found = true
            recipe["Rating"]["SumRatings"] -= gr["GivenRating"]
            recipe["Rating"]["NumRatings"] -= 1
            gr["GivenRating"] = Rating["GivenRating"]
            return
        }
    })

    recipe["Rating"]["SumRatings"] += Rating["GivenRating"]
    recipe["Rating"]["NumRatings"] += 1
    recipe["Rating"]["AverageRating"] = recipe["Rating"]["SumRatings"] / recipe["Rating"]["NumRatings"]
    recipe.save()

    if (!found) {
        user["GivenRatings"].push(Rating)
    }
    user.save()

    res.status(200).json({ "Rating": recipe["Rating"]["AverageRating"] })
}

const deleteRating = async (req, res) => {
    const { Email, RecipeId } = req.body

    const user = await User.findOne({ Email: Email })

    if (!user) {
        return res.status(404).json({ error: 'No such user: ' + Email })
    }

    const recipe = await Recipe.findById(RecipeId)

    if (!recipe) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    var rating = -1
    var idx = -1

    user["GivenRatings"].filter((gr) => {
        if (gr["RecipeId"].toString() === RecipeId) {
            rating = gr["GivenRating"]
            return
        }
        idx += 1
    })

    if (rating < 0) {
        return res.status(404).json({ error: "No rating found" })
    }

    user["GivenRatings"].splice(idx, 1)

    recipe["Rating"]["SumRatings"] -= rating
    recipe["Rating"]["NumRatings"] -= 1
    if (recipe["Rating"]["NumRatings"] > 0) {
        recipe["Rating"]["AverageRating"] = recipe["Rating"]["SumRatings"] / recipe["Rating"]["NumRatings"]
    } else {
        recipe["Rating"]["AverageRating"] = 0
    }

    user.save()
    recipe.save()

    res.status(200).json({ "Rating": recipe["Rating"]["AverageRating"] })
}

const getShoppingList = async (req, res) => {
    const { Email } = req.body

    const user = await User.findOne({ Email: Email })

    if (!user) {
        return res.status(408).json({ error: 'No such user: ' + Email })
    }

    res.status(200).json(user["ShoppingList"])
}

const emptyShoppingList = async (req, res) => {
    const { Email } = req.body

    const user = await User.findOne({ Email: Email })

    if (!user) {
        return res.status(408).json({ error: 'No such user: ' + Email })
    }

    user["ShoppingList"] = []

    user.save()

    res.status(200).json(user["ShoppingList"])
}

const addToShoppingList = async (req, res) => {
    //return res.status(501).json({ error: 'Not implemented' });
    const { Email, Ingredients } = req.body;
    const user = await User.findOne({ Email: Email });

    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }

    if (!("ShoppingList" in user)) {
        user["ShoppingList"] = [];
    }

    Ingredients.forEach((ingredient) => {
        var found = false;
        user["ShoppingList"].forEach((ing) => {
            if (ingredient["Identifier"] === ing["Identifier"]) {
                found = true;
                return;
            }
        });

        if (!found) {
            user["ShoppingList"].push(ingredient);
        }
    });

    // Save the user after processing the shopping list
    await user.save();

    // Respond to the client
    res.status(200).json(user["ShoppingList"]);
};

const editedShoppingList = async (req, res) => {
    const { Email, ShoppingList } = req.body;

    const user = await User.findOne({ Email: Email });

    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }

    user["ShoppingList"] = ShoppingList

    user.save()

    res.status(200).json(user["ShoppingList"]);

}

const setFollowing = async (req, res) => {
    const { Follower, Followed } = req.body

    const giver = await User.findOne({ Email: Follower })
    const reciever = await User.findOne({ Email: Followed })

    if (!giver) {
        return res.status(404).json({ error: 'No such user: ' + Follower })
    }

    if (!reciever) {
        return res.status(404).json({ error: 'No such user: ' + Followed })
    }

    /*if (reciever["_id"] in giver["FollowedUsers"]) {
        return res.status(304)
    }*/

    giver["FollowedUsers"].push(reciever["_id"])

    reciever["FollowerCount"] += 1

    await giver.save()
    await reciever.save()

    res.status(200).json(reciever)
}

const visitRecipe = async (req, res) => {
    const { Email, RecipeId } = req.body

    const user = await User.findOne({ Email: Email })

    if (!user) {
        return res.status(404).json({ error: 'No such user: ' + Email })
    }

    if (!mongoose.Types.ObjectId.isValid(RecipeId)) {
        return res.status(404).json({ error: 'Invalid Recipe Id: ' + RecipeId })
    }

    if (!("RecentlyViewed" in user)) {
        user["RecentlyViewed"] = []
    }

    var idx = user["RecentlyViewed"].indexOf(RecipeId)

    if (idx !== -1) {
        user["RecentlyViewed"].splice(idx, 1)
    }

    user["RecentlyViewed"].push(RecipeId)
    if (user["RecentlyViewed"].length > 3) {
        user["RecentlyViewed"].splice(0, 1)
    }
    await user.save()

    res.status(200).json(user)
}

const getHomeRecipes = async (req, res) => {
    const { Email } = req.params

    const user = await User.findOne({ Email: Email })

    if (!user) {
        return res.status(404).json({ error: 'No such user: ' + Email })
    }

    const recipes = await Recipe.find({}).sort({ createdAt: -1 })

    var recent = []
    for (const recipe of user["RecentlyViewed"]) {
        const r = await Recipe.findById(recipe)
        if (r) {
            recent.push(r)
        }
    }

    if (recipes.length == 0) {
        return res.status(200).json({
            "RecentRecipes": recent,
            "RecommendedRecipe": null
        })
    }

    var recommended = Math.floor(Math.random() * recipes.length)
    while (recipes[recommended]["PosterEmail"] == Email) {
        recommended = Math.floor(Math.random() * recipes.length)
    }

    res.status(200).json({
        "RecentRecipes": recent,
        "RecommendedRecipe": recipes[recommended]
    })
}

const getFollowedUsers = async (req, res) => {
    const { Email } = req.params

    const user = await User.findOne({ Email: Email })

    if (!user) {
        return res.status(404).json({ error: 'No such user: ' + Email })
    }

    const users = await User.find({ _id: { $in: user["FollowedUsers"] } })

    res.status(200).json(users)
}

const removeFollowedUser = async (req, res) => {
    const { Email, FollowedUser } = req.body;

    const user = await User.findOne({ Email: Email })

    const followed_user = await User.findOne({ Email: FollowedUser })

    if (!followed_user) {
        return res.status(404).json({ error: 'No such user: ' + FollowedUser })
    }

    if (!user) {
        return res.status(404).json({ error: 'No such user: ' + Email })
    }

    user["FollowedUsers"].splice(user["FollowedUsers"].indexOf(FollowedUser), 1)

    await user.save()

    followed_user["FollowerCount"] -= 1

    await followed_user.save()

    res.status(200).json(followed_user)
}

const getFollowingRecipes = async (req, res) => {
    try {
        const { Email } = req.body;

        // Find the user based on the provided email
        const user = await User.findOne({ Email });

        // If the user is not found, return an error response
        if (!user) {
            return res.status(404).json({ error: 'User not found for email: ' + Email });
        }

        // Retrieve emails of followed users
        const followedUserEmails = [];
        for (const followedUserId of user.FollowedUsers) {
            const followedUser = await User.findById(followedUserId);

            // Check if the followed user exists
            if (followedUser) {
                followedUserEmails.push(followedUser.Email);
            } else {
                console.warn('Followed user not found:', followedUserId);
            }
        }

        // Retrieve recipes posted by followed users
        const recipes = await Recipe.find({ PosterEmail: { $in: followedUserEmails } })
            .sort({ createdAt: -1 });

        // Respond with the collected recipes
        res.status(200).json(recipes);

    } catch (error) {
        console.error('Error in getFollowingRecipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const checkFollowing = async (req, res) => {
    try {
        const { Email, FollowedUser } = req.body;
        const user = await User.findOne({ Email });
        const followedUser = await User.findOne({ Email: FollowedUser });

        if (!followedUser) {
            return res.status(404).json({ error: 'No such user: ' + FollowedUser });
        }

        const isFollowing = user["FollowedUsers"].includes(followedUser._id);

        if (isFollowing) {
            return res.status(200).json({ "Following": true });
        } else {
            return res.status(201).json({ "Following": false });
        }

    } catch (error) {
        console.error('Error in checkFollowing:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    testMessage,
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    getUserByEmail,
    deleteUserByEmail,
    updateUserByEmail,
    searchForUser,
    addSavedRecipe,
    removeSavedRecipe,
    getSavedRecipes,
    addRating,
    deleteRating,
    getShoppingList,
    addToShoppingList,
    setFollowing,
    editedShoppingList,
    visitRecipe,
    emptyShoppingList,
    getFollowedUsers,
    removeFollowedUser,
    getHomeRecipes,
    getFollowingRecipes,
    checkFollowing
}