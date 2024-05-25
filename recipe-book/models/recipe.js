const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
content: {
type: String,
required: true
},
rating: {
type: Number,
min: 1,
max: 5,
default: 5
}
}, {
timestamps: true
});

const recipeSchema = new Schema({
title: { type: String, required: true },
releaseYear: {
type: Number,
default: function() {
    return new Date().getFullYear();
},
min: 1927
},
mpaaRating: {
type: String,
enum: ['G', 'PG', 'PG-13', 'R']
},
cast: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
nowShowing: { type: Boolean, default: true },
reviews: [reviewSchema]
}, {
timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);