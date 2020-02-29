// Load required packages
var mongoose = require('mongoose');

// Define our progress schema
var ProgressSchema = new mongoose.Schema({
    user_id: String,
    question_id: String,
    correct: Boolean,
    attempt_num: {type:Number, default: 0} 
});

// Export the Mongoose model
module.exports = mongoose.model('Progress', ProgressSchema);