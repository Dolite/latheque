// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

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
