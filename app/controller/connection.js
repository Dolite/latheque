var dbMongoose = require('../database/db-mongoose');

var activeConnection;

var activeObjectModel;
module.exports.activeObjectModel = activeObjectModel;
var activeUserModel;
module.exports.activeUserModel = activeUserModel;

var updateModels = function () {

	if (activeConnection == null) {
		activeObjectModel = null;
		activeUserModel = null;
		return false;
	}

	var dbtype = activeConnection.type;

	if (dbtype == 'MongoDB') {
		activeObjectModel = require('../models/mongoose/object').model;
		//activeUserModel = require('../models/mongoose/user').model;
		return true;
	} else {
		return false;
	}
}

var connect = function (req ,res) {

	if (activeConnection) {
		res.status(500).json({
			message:"A connection to a database is already active. Close it before connecting to a new database",
			database:activeConnection
		});
		return;
	}

	if (! req.dbtype) { req.body.dbtype = 'MongoDB'};

	if (req.body.dbtype == 'MongoDB') {

		dbMongoose.connect(
			req.body,
			function(err, dbinfos) {
				if (err) {
					res.status(500).json({message:"Connection to MongoDB database failed : "+err});
					return;
				}

				activeConnection = dbinfos;
				updateModels();

				res.status(200).json({
					message:"Connection to MongoDB database established",
					database:activeConnection
				});

				return;
			}
		);
	} else {
		res.status(400).json({message:"Unknown database type: " + req.body.dbtype});
		return;
	}
}

module.exports.connect = connect;

var disconnect = function (req ,res) {
	if (dbMongoose.getConnection()) {
		dbMongoose.disconnect(
			function(err) {
				if (err) {
					res.status(500).json({message:"Disconnection from MongoDB database encontered problems : "+err});
					return;
				}

				activeConnection = null;
				updateModels();

				res.status(200).json({message:"Successfully disconnection from MongoDB database"});
				return;
			}
		);
	}

	res.status(200).json({message:"No active connection to delete"});
}

module.exports.disconnect = disconnect;

var getActiveConnection = function (req ,res) {
	if (activeConnection) {
		res.status(200).json({
			message:"One connection is active",
			database:activeConnection
		});
		return;
	} else {
		res.status(200).json({message:"No active connection"});
		return;
	}
}

module.exports.getActiveConnection = getActiveConnection;

