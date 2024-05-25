const { default: mongoose } = require('mongoose')
const { Reply, Comment, Recipe, Ingredient, Rating } = require('../models/recipes.model')

const testMessage = async (req, res) => {
    res.send('Recipe route testing!')
}

const createRecipe = async (req, res) => {
    const { Title, Poster, Ingredients, Tags, Instructions, PrepTime, CookTime, Servings, Difficulty, PosterEmail } = req.body
    try {
        var rating = new Rating({
            AverageRating: 0,
            NumRatings: 0,
            SumRatings: 0
        })
        if ("Rating" in req.body) {
            rating = req.body["Rating"]
        }
        const ingredients = []
        for (const element of Ingredients) {
            ingredients.push(new Ingredient({ Identifier: element.id, Name: element.ingredient, Amount: element.quantity }))
        }
        var comments = []
        if ("Comments" in req.body) {
            comments = req.body["Comments"]
        }
        const recipe = await Recipe.create({
            Title,
            Poster,
            Ingredients: ingredients,
            Tags,
            Comments: comments,
            Instructions,
            Rating: rating,
            PrepTime,
            CookTime,
            Servings,
            Difficulty,
            PosterEmail
        })
        res.status(200).json(recipe)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllRecipes = async (req, res) => {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 })
    res.status(200).json(recipes)
}

const deleteRecipe = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid recipe id' })
    }

    const recipe = await Recipe.findOneAndDelete({ _id: id })

    if (!recipe) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    res.status(200).json(recipe)
}

const getViewRecipe = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid recipe id' })
    }

    const recipe = await Recipe.findById(id)

    if (!recipe) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    res.status(200).json(recipe)
}

const getRecipesByUser = async (req, res) => {
    const { PosterEmail } = req.params

    const recipes = await Recipe.find({ PosterEmail: PosterEmail });

    if (recipes.length === 0) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    res.status(200).json(recipes)
}

const searchForRecipe = async (req, res) => {
    const { Query } = req.params

    const recipes = await Recipe.find({ Title: { $regex: Query, $options: 'i' } })

    if (recipes.length === 0) {
        return res.status(404).json({ error: 'No matching recipes' })
    }

    res.status(200).json(recipes)
}
/*
const updateRecipe = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid recipe id' })
    }

    const recipe = {}
    const ingredients = []
    if ("Ingredients" in req.body) {
        const { Ingredients } = req.params
        for (const element of Ingredients) {
            ingredients.push(new Ingredient({ Identifier: element.id, Name: element.ingredient, Amount: element.quantity }))
        }
        recipe["Ingredients"] = ingredients
    }
    if ("Tags" in req.body) {
        const { Tags } = req.params
        recipe["Ingredients"] = Tags
    }
    if ("Title" in req.body) {
        const { Title } = req.params
        recipe["Ingredients"] = Title
    }
    if ("Instructions" in req.body) {
        const { Instructions } = req.params
        recipe["Ingredients"] = Instructions
    }
    if ("PrepTime" in req.body) {
        const { PrepTime } = req.params
        recipe["Ingredients"] = PrepTime
    }
    if ("CookTime" in req.body) {
        const { CookTime } = req.params
        recipe["Ingredients"] = CookTime
    }
    if ("Servings" in req.body) {
        const { Servings } = req.params
        recipe["Ingredients"] = Servings
    }
    if ("Difficulty" in req.body) {
        const { Difficulty } = req.params
        recipe["Ingredients"] = Difficulty
    }

    const update = await Recipe.findOneAndUpdate({ _id: id }, {
        ...recipe
    })

    if (!update) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    res.status(200).json(update)
}
*/

const addComment = async (req, res) => {
    const { RecipeId, Post, Poster } = req.body

    if (!mongoose.Types.ObjectId.isValid(RecipeId)) {
        return res.status(404).json({ error: 'Invalid recipe id' })
    }

    const recipe = await Recipe.findById(RecipeId)

    if (!recipe) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    const comment = new Comment({
        Comment: Post,
        Poster: Poster,
        Replies: []
    })

    if (!comment) {
        return res.status(500)
    }

    recipe["Comments"].push(comment)
    recipe.save()

    res.status(200).json({ "Comments": recipe["Comments"] })
}

const editComment = async (req, res) => {
    const { RecipeId, PostId, Post } = req.body

    if (!mongoose.Types.ObjectId.isValid(RecipeId)) {
        return res.status(404).json({ error: 'Invalid recipe id' })
    }

    const recipe = await Recipe.findById(RecipeId)

    if (!recipe) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    var edited = false

    recipe["Comments"].forEach((comment) => {
        if (comment["_id"].toString() === PostId) {
            edited = true
            comment["Comment"] = Post
            return
        }
    })

    if (!edited) {
        return res.status(404).json({ error: "No such comment" })
    }

    recipe.save()

    //Maybe should return the comment instead? Does it matter?
    res.status(200).json(recipe)
}

//May want to make this remove the comment if no replies and placeholder otherwise
const deleteComment = async (req, res) => {
    const { RecipeId, PostId } = req.body

    if (!mongoose.Types.ObjectId.isValid(RecipeId)) {
        return res.status(404).json({ error: 'Invalid recipe id' })
    }

    const recipe = await Recipe.findById(RecipeId)

    if (!recipe) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    var deleted = false

    recipe["Comments"].forEach((comment) => {
        if (comment["_id"].toString() === PostId) {
            deleted = true
            comment["Comment"] = "--Deleted--"
            comment["Poster"]["Email"] = "--Deleted--"
            comment["Poster"]["Username"] = "--Deleted--"
            return
        }
    })

    if (!deleted) {
        return res.status(404).json({ error: "No such comment" })
    }

    recipe.save()

    //Maybe should return the comment instead? Does it matter?
    res.status(200).json(recipe)
}

const addReply = async (req, res) => {
    const { RecipeId, PostId, Reply } = req.body


    if (!mongoose.Types.ObjectId.isValid(RecipeId)) {
        return res.status(404).json({ error: 'Invalid recipe id' })
    }

    const recipe = await Recipe.findById(RecipeId)

    if (!recipe) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    var found = false

    recipe["Comments"].forEach((comment) => {
        if (comment["_id"].toString() === PostId) {
            comment["Replies"].push(Reply)
            recipe.save()
            found = true
            return
        }
    })

    if (!found) {
        return res.status(404).json({ error: "No such comment" })
    }

    res.status(200).json({ "Comments": recipe["Comments"] })
}

const editReply = async (req, res) => {
    const { RecipeId, PostId, ReplyId, Message } = req.body

    if (!mongoose.Types.ObjectId.isValid(RecipeId)) {
        return res.status(404).json({ error: 'Invalid recipe id' })
    }

    const recipe = await Recipe.findById(RecipeId)

    if (!recipe) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    var postFound = false
    var replyFound = false

    recipe["Comments"].forEach((comment) => {
        if (comment["_id"].toString() === PostId) {
            comment["Replies"].forEach((reply) => {
                if (reply["_id"].toString() === ReplyId) {
                    reply["Comment"] = Message
                    recipe.save()
                    replyFound = true
                    return
                }
            })
            postFound = true
            return
        }
    })

    if (!postFound) {
        return res.status(404).json({ error: "No such comment" })
    }

    if (!replyFound) {
        return res.status(404).json({ error: "No such reply" })
    }

    res.status(200).json(recipe)
}

const deleteReply = async (req, res) => {
    const { RecipeId, PostId, ReplyId } = req.body

    if (!mongoose.Types.ObjectId.isValid(RecipeId)) {
        return res.status(404).json({ error: 'Invalid recipe id' })
    }

    const recipe = await Recipe.findById(RecipeId)

    if (!recipe) {
        return res.status(404).json({ error: 'No such recipe' })
    }

    var postFound = false
    var replyFound = false

    recipe["Comments"].forEach((comment) => {
        if (comment["_id"].toString() === PostId) {
            comment["Replies"] = comment["Replies"].filter((reply) => {
                if (reply["_id"].toString() === ReplyId) {
                    replyFound = true
                    return false
                }
                return true
            })
            postFound = true
            return
        }
    })

    if (!postFound) {
        return res.status(404).json({ error: "No such comment" })
    }

    if (!replyFound) {
        return res.status(404).json({ error: "No such reply" })
    }

    recipe.save()

    res.status(200).json(recipe)
}

module.exports = {
    testMessage,
    createRecipe,
    getAllRecipes,
    deleteRecipe,
    getRecipesByUser,
    searchForRecipe,
    getViewRecipe,
    //updateRecipe,
    addComment,
    editComment,
    deleteComment,
    addReply,
    editReply,
    deleteReply
}