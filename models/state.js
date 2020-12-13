// Load required packages
var mongoose = require('mongoose');

// Define our progress schema
var ProgressSchema = new mongoose.Schema({
    question_id: Number,
    correct: Boolean,
    attempt_num: {type:Number, default: 0}
});

var StateSchema = new mongoose.Schema({
    user_id: String,
    module_id: Number,
    scene_id: Number,
    line_id: Number,
    module_complete: Boolean,
    assessment_progress: [ProgressSchema]
})

// Export the Mongoose model
module.exports = mongoose.model('State', StateSchema);
