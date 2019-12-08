// Load required packages
var Question = require('../models/question');

// Create endpoint /api/questions for POSTS
exports.postQuestions = function(req, res) {
	// Create a new instance of the Question model
	var question = new Question();

	// Set the question properties that came from the POST data
	question.prompt = req.body.prompt;
    question.correct = req.body.correct;
    question.module_num = req.body.module_num;
    question.attempt_num = req.body.attempt_num;

	// Save the question and check for errors
	question.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Question added to the server!', data: question  });
	});
};

// Create endpoint /api/questions for GET
exports.getQuestions = function(req, res) {
	// Use the Question model to find all question
	Question.find(function(err, questions) {
		if (err)
			res.send(err);

		res.json(questions);
	});
};

// Create endpoint /api/questions/:question_id for GET
exports.getQuestion = function(req, res) {
	// Use the Question model to find a specific question
	Question.findById(req.params.question_id, function(err, question) {
		if (err)
			res.send(err);

		res.json(question);
	});
};

// Create endpoint /api/questions/:question_id for PUT
exports.putQuestion = function(req, res) {
	// Use the Question model to find a specific question
	Question.findById(req.params.question_id, function(err, question) {
		if (err)
			res.send(err);

		// Update the existing question answer
        question.correct = req.body.correct;
        question.attempt_num++;

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
	Question.findByIdAndRemove(req.params.question_id, function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Question removed from the server!' });
	});
};

