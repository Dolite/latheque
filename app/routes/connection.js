module.exports = function(){
	var express = require('express');
	var router = express.Router();
	var connectionController = require('../controller/connection');

	router.route('/')

		.post(function(req, res) {
			connectionController.connect(
				req, res,
				function(status, message, dbinfos)
			);
		})

		.delete(function(req, res) {
			connectionController.disconnect(req, res);
		})

		.get(function(req, res) {
			connectionController.getActiveConnection(req, res);
		});

	return router;
}();
