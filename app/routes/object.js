module.exports = function(){
	var express = require('express');
	var router = express.Router();
	var objectController = require('../controller/object');

	router.route('/')

		.post(function(req, res) {
			objectController.create(req, res);
		})

		.get(function(req, res) {
			objectController.getList(req, res);
		});

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
