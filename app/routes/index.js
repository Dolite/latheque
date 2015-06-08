/**
 * resourcePath: /api
 * description: All about API
 */
module.exports = function () {

    var express = require('express');
    var router = express.Router();

    router.use(function(req, res, next) {
        console.log(req.method, req.url);
        next(); 
    });

    router.use('/object', require('./object'));
    router.use('/user', require('./user'));

    return router;

}();
