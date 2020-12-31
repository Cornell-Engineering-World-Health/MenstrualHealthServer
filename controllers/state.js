// Load required packages
var State = require('../models/state');

// Create endpoint /api/state for POSTS
exports.postState = function(req, res) {

	// Create a new instance of the State model
	var state = new State();

	// Set the state properties that came from the POST data
	state.user_id = req.body.user_id;
	state.module_id = req.body.module_id;
	state.scene_id = req.body.scene_id;
	state.line_id = req.body.line_id;
	state.module_complete = req.body.module_complete;
  state.assessment_progress = req.body.assessment_progress;

	// Save the state and check for errors
	state.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'State added to the server.', data: state  });
	});
};

// Create endpoint /api/state for GET
exports.getAllState = function(req, res) {
	// Use the State model to find all state
	State.find(function(err, state) {
		if (err)
			res.send(err);

		res.json(state);
	});
};

// Create endpoint /api/state/:state_id for GET
exports.getState = function(req, res) {
	// Use the State model to find specific states by state_id
	State.findById(req.params.state_id, function(err, state) {
		if (err)
			res.send(err);

		res.json(state);
	});
};

// Create endpoint /api/state/user/:user_id for GET
exports.getUserState = function(req, res) {
    // Use the State model to find all state from user_id
	  State.findOne({user_id: req.params.user_id}, function(err, state) {
        if (err)
            res.send(err);

        res.json(state);
    });
};

// Create endpoint /api/state/user/:user_id for PUT
exports.putUserState = function(req, res) {
	// Use the State model to find specific state
	State.findOne({user_id: req.params.user_id}, function(err, state) {
		if (err)
			res.send(err);

				state.module_id = req.body.module_id;
				state.scene_id = req.body.scene_id;
				state.line_id = req.body.line_id;
				state.module_complete = req.body.module_complete;
			  state.assessment_progress = req.body.assessment_progress;

		// Save the state and check for errors
		state.save(function(err) {
			if (err)
				res.send(err);

			res.json(state);
		});
	});
};

// Create endpoint /api/state/:state_id for PUT
exports.putState = function(req, res) {
	// Use the State model to find specific state
	State.findById(req.params.state_id, function(err, state) {
		if (err)
			res.send(err);

				state.module_id = req.body.module_id;
				state.scene_id = req.body.scene_id;
				state.line_id = req.body.line_id;
				state.module_complete = req.body.module_complete;
			  state.assessment_progress = req.body.assessment_progress;

		// Save the state and check for errors
		state.save(function(err) {
			if (err)
				res.send(err);

			res.json(state);
		});
	});
};

// Create endpoint /api/state/:state_id for DELETE
exports.deleteState = function(req, res) {
	// Use the State model to find specific state and remove it
	State.findByIdAndRemove(req.params.state_id, function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'State removed from the server.' });
	});
};
