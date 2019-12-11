// Load required packages
var mongoose = require('mongoose');

// Define our gamestate schema
var GamestateSchema   = new mongoose.Schema({
    state_id: String,
    module_num: Number,
    checkpoint_id: String
});

// Export the Mongoose model
module.exports = mongoose.model('Gamestate', GamestateSchema);