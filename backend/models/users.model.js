const mongoose = require('mongoose');

const GivenRatingSchema = new mongoose.Schema({
  RecipeId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Recipe'
  },
  GivenRating: {
    type: Number
  }
})

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
}, { timestamps: true })

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    unique: true,
    required: true
  },
  Bio: {
    type: String,
    required: false,
    default: ""
  },
  /*Image: {
    type: String,
    required: true,
    default: ""
  },*/
  Private: {
    type: Boolean,
    required: false,
    default: true
  },
  GoogleAccount: {
    type: Boolean,
    required: false,
    default: false
  },
  Verified: {
    type: Boolean,
    required: false,
    default: false
  },
  SavedRecipes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Recipe'
  }],
  GivenRatings: [{
    type: GivenRatingSchema
  }],
  ShoppingList: [{
    type: IngredientSchema
  }],
  FollowedUsers: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  FollowerCount: {
    type: Number,
    required: true,
    default: 0
  },
  RecentlyViewed: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Recipe'
  }]
}, { timestamps: true });

const Ingredient = mongoose.model('ShoppingIngredient', IngredientSchema)
const GivenRating = mongoose.model('GivenRating', GivenRatingSchema)
const User = mongoose.model('User', UserSchema)
module.exports = { User, GivenRating, Ingredient }

//https://www.youtube.com/watch?v=srPXMt1Q0nY <-- Possible source for imgs, still reasearching