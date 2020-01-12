// Load required packages
var mongoose = require('mongoose');

// Deffine our progress schema
var ProgressSchema = new mongoose.Schema({
    user_id: String,
    question_id: String,
    correct: Boolean,
    num_attempts: Number 
});

// Export the Mongoose model
module.exports = mongoose.model('Progress', ProgressSchema);