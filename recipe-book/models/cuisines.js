
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const cuisineSchema = new Schema({
cuisine: {type: String,
    required: true
},

}, {
timestamps: true
});


module.exports = mongoose.model('Cuisine', cuisineSchema);