// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var questionController = require('./controllers/question');
var userController = require('./controllers/user');
var adminController = require('./controllers/admin')

// Connect to the game_server MongoDB
mongoose.connect('mongodb+srv://Vivi:yywyyw@gameserver-wwz3i.mongodb.net/test?retryWrites=true&w=majority');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Welcome!' }); 
});

// Create endpoint handlers for /questions
router.route('/questions')
    .post(questionController.postQuestions)
    .get(questionController.getQuestions);

// Create endpoint handlers for /questions/:question_id
router.route('/questions/:question_id')
    .get(questionController.getQuestion)
    .put(questionController.putQuestion)
    .delete(questionController.deleteQuestion);

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

// Create endpoint handlers for /users/:user_id
router.route('/users/:user_id')
    .get(userController.getUser)
    .delete(userController.deleteUser);

// Create endpoint handlers for /admins
router.route('/admins')
    .post(adminController.postAdmins)
    .get(adminController.getAdmins);

// Create endpoint handlers for /admins/:admin_id
router.route('/admins/:admin_id')
    .get(adminController.getAdmin)
    .delete(adminController.deleteAdmin);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(process.env.PORT || 5000);