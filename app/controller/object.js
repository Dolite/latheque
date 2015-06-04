var objectPersistence = require('../persistence/mongodb/object');

module.exports.create = function (req ,res) {

    objectPersistence.add(req ,res);
}

module.exports.remove = function (req ,res) {

    objectPersistence.delete(req ,res);
}

module.exports.findById = function (req ,res) {

    objectPersistence.get(req ,res);
}

module.exports.findAll = function (req ,res) {

    objectPersistence.gets(req ,res);
}

module.exports.update = function (req ,res) {

    objectPersistence.update(req ,res);
}

