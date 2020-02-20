// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POSTS
exports.postUsers = function(req, res) {
    // Create a new instance of the User model
    var user = new User();

    // Set the user properties that came from the POST data
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.village_name = req.body.village_name;
    user.date_registered = new Date();
    user.admin_id = req.body.admin_id;
    user.state_id = req.body.state_id;

    // Save the user and check for errors
    user.save(function(err) {
              if(err)
                res.send(err);

    res.json({ message: 'User added to the server.', data: user
        });
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
	// Use the User model to find all users
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	User.find(function(err, users) {
		if (err)
			res.send(err);

		res.json(users);
	});
};

// Create endpoint /api/users/:user_id for GET
exports.getUser = function(req, res) {
	// Use the User model to find a specific user
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  User.findById(req.params.user_id, function(err, user) {
		if (err)
			res.send(err);

		res.json(user);
	});
};

// Create endpoint /api/users/:admin_id for GET
exports.getUsersByAdmin = function(req, res) {
    // Use the User model to find all users with admin_id
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    User.find({admin_id: req.params.admin_id}, function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
};

// Create endpoint /api/users/:user_id for DELETE
exports.deleteUser = function(req, res) {
	// Use the User model to find a specific user and remove it
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  User.findByIdAndRemove(req.params.user_id, function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'User removed from the server.' });
	});
};
