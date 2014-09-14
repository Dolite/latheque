var dbMongoose = require('../database/db-mongoose');

var connect = function (req ,res, callback) {
	if (! req.dbtype) { req.body.dbtype = 'MongoDB'};

	if (req.body.dbtype == 'MongoDB') {

		var activeConn = dbMongoose.getConnection();
		if (activeConn) {
			callback(
				500,
				"A connection to MongoDB database is already active. Close it before connecting to a new database",
				activeConn
			);
			return;
		}

		dbMongoose.connect(
			req.body,
			function(err, dbinfos) {
				if (err) {
					callback(
						500,
						"Connection to MongoDB database failed : "+err,
						dbinfos
					);
					return;
				}

				callback(
					200,
					"Connection to MongoDB database established",
					dbinfos
				);
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
					res.status(500).json({message:"Disconnection from MongoDB database encontered problems : "+err}).end();
					return;
				}
				
				res.status(200).json({message:"Successfully disconnection from MongoDB database"});
				return;
			}
		);
	}

	res.status(200).json({message:"No active connection to delete"});
}

module.exports.disconnect = disconnect;

var getActiveConnection = function (req ,res) {
	var connMongoDB = dbMongoose.getConnection();
	if (connMongoDB) {
		res.status(200).json({
			message:"One connection is active",
			database:connMongoDB
		});
		return;
	} else {
		res.status(200).json({message:"No active connection"});
		return;		
	}
}

module.exports.getActiveConnection = getActiveConnection;

