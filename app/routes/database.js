module.exports = function(){
	var express = require('express');
	var router = express.Router();
	var databaseController = require('../controller/database');

	router.route('/')

		.post(function(req, res) {
			databaseController.connectToDatabase(req, res);
		});
/*
		.get(function(req, res) {
			databaseController.getActiveConnection(req, res);
		});
*/
	return router;
}();
