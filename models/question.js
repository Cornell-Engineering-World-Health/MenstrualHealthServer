// Load required packages
var mongoose = require('mongoose');

// Define our question schema
var QuestionSchema   = new mongoose.Schema({
    prompt: String,
    module_num: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Question', QuestionSchema);