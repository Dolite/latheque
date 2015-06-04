module.exports = function () {
    var express = require('express');
    var router = express.Router();
    var objectController = require('../controller/object');

    router.route('/')

        .post(function(req, res) {
            objectController.create(req, res);
        });
/*
        .get(function(req, res) {
            objectController.findAll(req, res);
        });*/


    router.route('/:id')

        .get(function(req, res) {
            objectController.findById(req, res);
        })

        .delete(function(req, res) {
            objectController.remove(req, res);
        });

    return router;
} ();
