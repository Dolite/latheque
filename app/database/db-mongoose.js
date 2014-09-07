var mongoose = require('mongoose');

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
	console.log('Mongoose connection opened');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
	console.log('Mongoose connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose connection disconnected');
});
/*
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
	mongoose.connection.close(
		function () {
			console.log('Mongoose connection disconnected through app termination');
			// process.exit(0);
		}
	);
});*/

var connect = function(params, callback) {

	if (! params.host) params.host = 'localhost';
	if (! params.port) params.port = '27017';

	if (! params.dbname) params.dbname = 'latheque';
	
	if (! params.user) params.user = '';
	if (! params.passwd) params.passwd = '';

	var connString =
		'mongodb://' +
		params.db_user + ':' + params.db_passwd +
		'@' +
		params.db_host + '/' + params.db_name;

	mongoose.connect(connString, callback);
}

module.exports.connect = connect;