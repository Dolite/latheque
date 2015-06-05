var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongodb   = require('mongodb');
var routing    = require('./app/routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8081;

var clean = function () {
	// TODO :fermer la connexion à la base de donnée
    console.log('Shutdown');
    process.exit(1);
}

app.use('/api', routing);

app.on('close',clean);
process.on('SIGINT', clean);
process.on('SIGTERM', clean);

app.listen(port);
console.log('latheque started on port ' + port);
