// Load required packages
var mongoose = require('mongoose');

// Define our question schema
var QuestionSchema   = new mongoose.Schema({
    prompt: String,
    correct: Boolean,
    module_num: Number,
    attempt_num: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Question', QuestionSchema);