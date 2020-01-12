// Load required packages
var mongoose = require('mongoose');

// Define our question schema
var QuestionSchema   = new mongoose.Schema({
    prompt: String,
    //question_id: String, built in??
    module_num: Number
    //attempt_num: {type:Number, default: 0}
});

// Export the Mongoose model
module.exports = mongoose.model('Question', QuestionSchema);