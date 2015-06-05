module.exports = function () {
    var express = require('express');
    var router = express.Router();
    var objectController = require('../controller/object');

    router.route('/')

        .get(function(req, res) {
            console.log('Getting all objects');
            objectController.findAll(req, res);
        })

        .post(function(req, res) {
            console.log('Creating object: ' + JSON.stringify(req.body));
            objectController.create(req, res);
        });

    router.route('/:id')

        .get(function(req, res) {
            console.log('Getting object ' + req.params.id);
            objectController.findById(req, res);
        })

        .put(function(req, res) {
            console.log('Updating object ' + req.params.id + ': ' + JSON.stringify(req.body));
            objectController.update(req, res);
        })

        .delete(function(req, res) {
            console.log('Deleting object ' + req.params.id);
            objectController.remove(req, res);
        });

    return router;
} ();
