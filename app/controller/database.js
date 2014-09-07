var dbMongoose = require('../database/db-mongoose');

var connectToDatabase = function (req ,res) {
	if (! req.dbtype) { req.body.dbtype = 'MongoDB'};

	if (req.body.dbtype == 'MongoDB') {
		dbMongoose.connect(
			req.body,
			function(err) {
				if (err) {
					res.status(500).json({message:"Connection to MongoDB database failed"});
					return;
				}
				
				res.status(200).json({message:"Connection to MongoDB database established"});
				return;
			}
		);
	} else {
		res.status(400).json({message:"Unknown database type: " + req.body.dbtype});
		return;
	}
}

module.exports.connectToDatabase = connectToDatabase;
/*
var getActiveConnection = function (req ,res) {

	if (req.body.dbtype == MongoDB) {
		dbMongoose.connect(
			req.body,
			function(connection) {
				if (! connection) {
					res.status(500).json({message:"Connection to MongoDB database failed"});
					return;
				}
				
				res.status(200).json({message:"Connection to MongoDB database established"});
			}
		);
	} else {
		res.status(400).json({message:"Unknown database type: " + req.body.dbtype});
		return;
	}
}

module.exports.getActiveConnection = getActiveConnection;
*/
