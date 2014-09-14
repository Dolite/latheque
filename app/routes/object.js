module.exports = function(){
	var express = require('express');
	var router = express.Router();
	var objectController = require('../controller/object');
	var connectionController = require('../controller/connection');

	/* Pour toutes ces fonctions, une connection doit être établie
	 * On le teste là */

	if (connectionController.getActiveConnection() == null) {
		res.status(500).json({message:"No active connection to a database to request"});
		return;
	}

	router.route('/')

		.post(function(req, res) {
			objectController.create(req, res);
		});
/*
		.get(function(req, res) {
			objectController.getList(req, res);
		});
*/
	router.route('/list/')

		.get(function(req, res) {
			objectController.getListAttributes(req, res);
		});

	router.route('/list/:attribute')

		.get(function(req, res) {
			objectController.getListAttributeValues(req, res);
		});

	router.route('/:id')

		.get(function(req, res) {
			objectController.getById(req, res);
		})

		.delete(function(req, res) {
			objectController.remove(req, res);
		});

	return router;
}();
