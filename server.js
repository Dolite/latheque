// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// Connexion à la base
var mongoose   = require('mongoose');

var db_user = '';
var db_passwd = '';
var db_name = 'touttheque';
var db_host = 'localhost';
var connString = 'mongodb://' + db_user + ':' + db_passwd + '@' + db_host + '/' + db_name;
//mongoose.connect('mongodb://localhost:27017'); // connect to our database
mongoose.connect(connString);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8081; 		// set our port

// ROUTES FOR OUR API
// =============================================================================

app.use('/api', require('./app/routes/index'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('latheque started on port ' + port);
