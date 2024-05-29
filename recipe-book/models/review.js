const mongoose = require('mongoose')

const schema = mongoose.Schema

const reviewSchema = new schema(
  {
    dish: {
      type: String,
      required: true
    },
    heading: {
      type: String,
      required: true
    },
    detail: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    username: [{ type: schema.Types.ObjectId, ref: 'User' }],
    recipeID: [{ type: schema.Types.ObjectId, ref: 'Recipe' }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Review', reviewSchema)
