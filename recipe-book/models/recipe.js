const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema(
  {
    cuisine: { type: String, required: true },
    Dish: { type: String, required: true },
    Time: { type: Number, required: true },
    Ingredents: { type: String, required: true },
    Steps: { type: String, required: true },
    doneBY: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    reviewon: [{ type: Schema.Types.ObjectId, ref: 'review' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Recipe', recipeSchema)
