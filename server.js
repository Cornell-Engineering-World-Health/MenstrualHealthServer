// Load required packages

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userController = require('./controllers/user');
var stateController = require('./controllers/state');
var adminController = require('./controllers/admin');
var url = process.env.MONGO_URI;
var API_KEY = process.env.API_KEY;
// Connect to the game_server MongoDB
mongoose.connect(url);

// Create our Express application
var app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, X-API-Key');
  next();
})

var authorization = function(req, res, next) {
  if(!req.headers['x-api-key']) {
    return res.json({ error: 'No credentials sent!' });
  } else if (req.headers['x-api-key'] != API_KEY) {
    return res.json({ message: 'Unauthorized.' });
  }
  next();
}

app.use(authorization);

// Use enviroment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Welcome!' });
});

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

// Create endpoint handlers for /users/:user_id
router.route('/users/:user_id')
    .get(userController.getUser)
    .delete(userController.deleteUser);

// Create endpoint handlers for /users/admin/:admin_id
router.route('/users/admin/:admin_id')
    .get(userController.getUsersByAdmin);

// Create endpoint handlers for /state
router.route('/state')
    .post(stateController.postState)
    .get(stateController.getAllState);

// Create endpoint handlers for /state/:state_id
router.route('/state/:state_id')
    .put(stateController.putState)
    .delete(stateController.deleteState)
    .get(stateController.getState);

// Create endpoint handlers for /state/:user_id
router.route('/state/:user_id')
    .get(stateController.getUserState);

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
