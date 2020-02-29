// Load required packages
var mongoose = require('mongoose');

// Define our admin schema
var AdminSchema = new mongoose.Schema({
    username: String,
});

// Export the Mongoose model
module.exports = mongoose.model('Admin', AdminSchema);