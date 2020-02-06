// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema   = new mongoose.Schema({
    first_name: String,
    last_name: String,
    admin_id: String,
    state_id: String
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);