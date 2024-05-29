//const cuisines = require('../public/routes/cuisines.js');

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema(
  {
    cuisine: { type: String, required: true },
    Dish: { type: String, required: true },
    Time: { type: Number, required: true },
    Ingredients: { type: [String], default: [] },
    Steps: { type: [String], default: [] },
    doneBY: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reviewon: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Recipe', recipeSchema)
