// Load required packages

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var questionController = require('./controllers/question');
var userController = require('./controllers/user');
var progressController = require('./controllers/progress');
var adminController = require('./controllers/admin');

var url = process.env.MONGODB_URI;
// Connect to the game_server MongoDB
mongoose.connect('mongodb+srv://Vivi:yywyyw@gameserver-wwz3i.mongodb.net/test?retryWrites=true&w=majority');

// Create our Express application
var app = express();

// Use the body-parser package in our application
/* app.use(bodyParser.urlencoded({
    extended: true
})); */

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization');
  next();
})

// Use endvironment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Welcome!' });
});

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-mhs.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://mhs-api',
    issuer: 'https://dev-mhs.auth0.com/',
    algorithms: ['RS256']
});

// auth key
//app.use(jwtCheck);

// Create endpoint handlers for /questions
router.route('/questions')
    .post(questionController.postQuestions)
    .get(questionController.getQuestions);

// Create endpoint handlers for /questions/:question_id
router.route('/questions/:question_id')
    .get(questionController.getQuestion)
    .put(questionController.putQuestion)
    .delete(questionController.deleteQuestion);

// Create endpoint handlers for /questions/modules/:module_num
router.route('/questions/modules/:module_num')
    .get(questionController.getModuleQuestions);

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

// Create endpoint handlers for /users/:user_id
router.route('/users/:user_id')
    .get(userController.getUser)
    .delete(userController.deleteUser);

// Create endpoint handlers for /users/:admin_id
router.route('/users/:admin_id')
    .get(userController.getUsersByAdmin);

// Create endpoint handlers for /progress
router.route('/progress')
    .post(progressController.postProgress)
    .get(progressController.getAllProgress);

// Create endpoint handlers for /progress/:progress_id
router.route('/progress/:progress_id')
    .put(progressController.putProgress)
    .delete(progressController.deleteProgress)
    .get(progressController.getProgress);

// Create endpoint handlers for /progress/:user_id
router.route('/progress/:user_id')
    .get(progressController.getUserProgress);

// Create endpoint handlers for /progress/:question_id
router.route('/progress/:question_id')
    .get(progressController.getQuestionProgress);

// Create endpoint handlers for /progress/:user_id/:question_id
router.route('/progress/:user_id/:question_id')
    .get(progressController.getUserQuestionProgress);

// Create endpoint handlers for /admins
router.route('/admins')
    .post(adminController.postAdmins)
    .get(adminController.getAdmins);

// Create endpoint handlers for /admins/:admin_id
router.route('/admins/:admin_id')
    .get(adminController.getAdmin)
    .put(adminController.putAdmin)
    .delete(adminController.deleteAdmin);


// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(process.env.PORT || 5000);
