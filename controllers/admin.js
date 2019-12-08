// Load required packages
var Admin = require('../models/admin');

// Create endpoint /api/admins for POSTS
exports.postAdmins = function(req, res) {
	// Create a new instance of the Admin model
	var admin = new Admin();

	// Set the admin properties that came from the POST data
	admin.username = req.body.username;

	// Save the admin and check for errors
	admin.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Admin added to the server!', data: admin  });
	});
};

// Create endpoint /api/admins for GET
exports.getAdmins = function(req, res) {
	// Use the Admin model to find all admin
	Admin.find(function(err, admins) {
		if (err)
			res.send(err);

		res.json(admins);
	});
};

// Create endpoint /api/admins/:admin_id for GET
exports.getAdmin = function(req, res) {
	// Use the Admin model to find a specific admin
	Admin.findById(req.params.admin_id, function(err, admin) {
		if (err)
			res.send(err);

		res.json(admin);
	});
};

// Create endpoint /api/admins/:admin_id for PUT
exports.putAdmin = function(req, res) {
	// Use the Admin model to find a specific admin
	Admin.findById(req.params.admin_id, function(err, admin) {
		if (err)
			res.send(err);

		// Update the existing admin username
        admin.username = req.body.username;

		// Save the admin and check for errors
		admin.save(function(err) {
			if (err)
				res.send(err);

			res.json(admin);
		});
	});
};

// Create endpoint /api/admins/:admin_id for DELETE
exports.deleteAdmin = function(req, res) {
	// Use the Admin model to find a specific admin and remove it
	Admin.findByIdAndRemove(req.params.admin_id, function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Admin removed from the server!' });
	});
};