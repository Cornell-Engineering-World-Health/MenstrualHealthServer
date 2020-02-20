// Load required packages
var Progress = require('../models/progress');

// Create endpoint /api/progress for POSTS
exports.postProgress = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	// Create a new instance of the Progress model
	var progress = new Progress();

	// Set the progress properties that came from the POST data
	progress.user_id = req.body.user_id;
    progress.question_id = req.body.question_id;
    progress.correct = req.body.correct;
    progress.attempt_num = req.body.attempt_num;

	// Save the progress and check for errors
	progress.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Progress added to the server.', data: progress  });
	});
};

// Create endpoint /api/progress for GET
exports.getAllProgress = function(req, res) {
	// Use the Progress model to find all progress
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	Progress.find(function(err, progress) {
		if (err)
			res.send(err);

		res.json(progress);
	});
};

// Create endpoint /api/progress/:progress_id for GET
exports.getProgress = function(req, res) {
	// Use the Progress model to find specific progresss by progress_id
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	Progress.findById(req.params.progress_id, function(err, progress) {
		if (err)
			res.send(err);

		res.json(progress);
	});
};

// Create endpoint /api/progress/:user_id for GET
exports.getUserProgress = function(req, res) {
    // Use the Progress model to find all progress from user_id
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	  Progress.find({user_id: req.params.user_id}, function(err, progress) {
        if (err)
            res.send(err);

        res.json(progress);
    });
};

// Create endpoint /api/progress/:question_id for GET
exports.getQuestionProgress = function(req, res) {
    // Use the Progress model to find all progress from question_id
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	  Progress.find({question_id: req.params.question_id}, function(err, progress) {
        if (err)
            res.send(err);

        res.json(progress);
    });
};

// Create endpoint /api/progress/:user_id/:question_id for GET
exports.getUserQuestionProgress = function(req, res) {
    // Use the Progress model to find all progress from user_id and question_id
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
		Progress.find({user_id: req.params.user_id}, function(err, progress) {
        if (err)
            res.send(err);
        else {
            Progress.find({question_id: req.params.question_id}, function(err, progress) {
                if (err)
                    res.send(err);

                res.json(progress);
            });
        }
    });
};

// Create endpoint /api/progress/:progress_id for PUT
exports.putProgress = function(req, res) {
	// Use the Progress model to find specific progress
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	Progress.findById(req.params.progress_id, function(err, progress) {
		if (err)
			res.send(err);

		// Update current progres
        progress.correct = req.body.correct;
        progress.attempt_num++;

		// Save the progress and check for errors
		progress.save(function(err) {
			if (err)
				res.send(err);

			res.json(progress);
		});
	});
};

// Create endpoint /api/progress/:progress_id for DELETE
exports.deleteProgress = function(req, res) {
	// Use the Progress model to find specific progress and remove it
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	Progress.findByIdAndRemove(req.params.progress_id, function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Progress removed from the server.' });
	});
};
