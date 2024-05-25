const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  AverageRating: {
    type: Number,
    required: true,
    unique: false,
  },
  NumRatings: {
    type: Number,
    required: true
  },
  SumRatings: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const IngredientSchema = new mongoose.Schema({
  Identifier: {
    type: Number,
    required: true,
    //unique: true,
    minlength: 1
  },
  Name: {
    type: String,
    required: true
  },
  Amount: {
    type: String,
    required: true
  }
}, { timestamps: true });

const ReplySchema = new mongoose.Schema({
  Comment: {
    type: String,
    required: true,
    unique: false,
    maxlength: 300
  },
  Poster: {
    Email: {
      type: String,
      required: true
    },
    Username: {
      type: String,
      required: true
    }
  }
}, { timestamps: true })

const CommentSchema = new mongoose.Schema({
  Comment: {
    type: String,
    required: true,
    unique: false,
    maxlength: 300
  },
  Poster: {
    Email: {
      type: String,
      required: true
    },
    Username: {
      type: String,
      required: true
    }
  },
  Replies: [{
    type: ReplySchema
  }]
}, { timestamps: true })

const RecipeSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    minlength: 1
  },
  Poster: {
    type: String,
    required: true,
    minlength: 1
  },
  Ingredients: [{
    type: IngredientSchema
  }],
  Tags: [{
    type: String,
    required: true
  }],
  Comments: [{
    type: CommentSchema
  }],
  Instructions: {
    type: String,
    required: true,
    minlength: 1
  },
  Rating: {
    type: RatingSchema
  },
  PrepTime: {
    type: Number,
    required: true
  },
  CookTime: {
    type: Number,
    required: true
  },
  Servings: {
    type: Number,
    required: true
  },
  Difficulty: {
    type: String,
    required: true
  },
  PosterEmail: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Reply = mongoose.model('Reply', ReplySchema)
const Comment = mongoose.model('Comment', CommentSchema)
const Ingredient = mongoose.model('Ingredient', IngredientSchema)
const Rating = mongoose.model('Rating', RatingSchema)
const Recipe = mongoose.model('Recipe', RecipeSchema)
module.exports = { Reply, Comment, Rating, Ingredient, Recipe }