// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var AdminSchema   = new mongoose.Schema({
    username: String,
});

// Export the Mongoose model
module.exports = mongoose.model('Admin', AdminSchema);