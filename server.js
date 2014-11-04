// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var swagger    = require('swagger-express');
var auth       = require('./app/authentification/auth-local');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8081; 		// set our port

// AUTHENTIFICATION
// =============================================================================



// ROUTES FOR OUR API
// =============================================================================

app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    basePath: 'http://localhost:3000',
    apis: [],
    middleware: function(req, res){}
}));

app.use(auth.initialize());
app.use(auth.session());

app.use(
    '/api',
    require('./app/routes/index')
);

app.on('close', function() {
    // On écoute l'évènement close
    console.log('Shutdown');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('latheque started on port ' + port);
