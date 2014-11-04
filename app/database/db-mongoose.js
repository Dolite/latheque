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
	activeConnection = null;
	console.log("state : " + mongoose.connection.readyState)
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
	mongoose.connection.close(
		function () {
			console.log('Mongoose connection disconnected through app termination');
		}
	);
});

var connect = function(params, callback) {

	if (! params.host) params.host = 'localhost';
	if (! params.port) params.port = '27017';

	if (! params.dbname) params.dbname = 'latheque';
	
	if (! params.user) params.user = '';
	if (! params.passwd) params.passwd = '';

	var connString =
		'mongodb://' +
		params.user + ':' + params.passwd +
		'@' +
		params.host + ':' + params.port + '/' + params.dbname;

	mongoose.connect(
		connString,
		function(err) {
			var dbinfos = null;
			if (! err) {
				dbinfos = {
					type:"MongoDB",
					host:params.host,
					port:params.port,
					dbname:params.dbname
				};
			}
			
			callback(err, dbinfos);
		}
	);
}

module.exports.connect = connect;

var disconnect = function(callback) {
	mongoose.connection.close(
		function(err){
			callback(err);
		}
	);
}

module.exports.disconnect = disconnect;
