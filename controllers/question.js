// Load required packages
var Question = require('../models/question');

// Create endpoint /api/questions for POSTS
exports.postQuestions = function(req, res) {
	// Create a new instance of the Question model
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	var question = new Question();

	// Set the question properties that came from the POST data
	question.prompt = req.body.prompt;
    question.module_num = req.body.module_num;

	// Save the question and check for errors
	question.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Question added to the server.', data: question  });
	});
};

// Create endpoint /api/questions for GET
exports.getQuestions = function(req, res) {
	// Use the Question model to find all question
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	Question.find(function(err, questions) {
		if (err)
			res.send(err);

		res.json(questions);
	});
};

// Create endpoint /api/questions/:question_id for GET
exports.getQuestion = function(req, res) {
	// Use the Question model to find a specific question
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	Question.findById(req.params.question_id, function(err, question) {
		if (err)
			res.send(err);

		res.json(question);
	});
};

// Create endpoint /api/questions/modules/:module_num for GET
exports.getModuleQuestions = function(req, res) {
    // Use the Question model to find all questions from module_num
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	  Question.find({module_num: req.params.module_num}, function(err, questions) {
        if (err)
            res.send(err);

        res.json(questions);
    });
};

// Create endpoint /api/questions/:question_id for PUT
exports.putQuestion = function(req, res) {
	// Use the Question model to find a specific question
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	Question.findById(req.params.question_id, function(err, question) {
		if (err)
			res.send(err);

		// Update the existing question prompt
        question.prompt = req.body.prompt;

		// Save the question and check for errors
		question.save(function(err) {
			if (err)
				res.send(err);

			res.json(question);
		});
	});
};

// Create endpoint /api/questions/:question_id for DELETE
exports.deleteQuestion = function(req, res) {
	// Use the Question model to find a specific question and remove it
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	Question.findByIdAndRemove(req.params.question_id, function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Question removed from the server.' });
	});
};
