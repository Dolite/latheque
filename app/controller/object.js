var objectPersistence = require('../persistence/fakedb/object');
//var objectPersistence = require('../persistence/mongodb/object');


function getMissingAttributes (obj) {
    var mandatoryAttributes = [
        'title', 'type'
    ];

    var missingAttributes = new Array();

    for (var i = 0; i < mandatoryAttributes.length; i++) {
        if (obj[mandatoryAttributes[i]] == null) {
            missingAttributes.push(mandatoryAttributes[i]);
        }
    }

    return missingAttributes;
}



module.exports.findById = function (req ,res) {

    objectPersistence.get(
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(404).json({"message":err});
            } else {
                res.status(200).json(result);
            }
        }
    );
}

module.exports.findAll = function (req ,res) {

    objectPersistence.gets(
        function (err, result) {
            if (err) {
                res.status(500).json({"message":err});
            } else {
                res.status(200).json(result);
            }
        }
    );
}

module.exports.create = function (req ,res) {

    var object = req.body;

    var missingAttributes = getMissingAttributes(object);

    if (missingAttributes.length != 0) {
        res.status(400).json({"message":"Attribut(s) manquant(s) pour la création : " + missingAttributes});
        return;
    }

    objectPersistence.add(
        object,
        function (err, result) {
            if (err) {
                res.status(400).json({"message":err});
            } else {
                res.status(200).json(result);
            }
        }
    );
}

module.exports.update = function (req ,res) {

    var object = req.body;

    var missingAttributes = getMissingAttributes(object);

    if (missingAttributes.length != 0) {
        res.status(400).json({"message":"Attribut(s) manquant(s) pour la mise à jour : " + missingAttributes});
        return;
    }

    object.id = req.params.id;

    objectPersistence.update(
        object,
        function (err, result) {
            if (err) {
                res.status(404).json({"message":err});
            } else {
                res.status(200).json(result);
            }
        }
    );
}

module.exports.remove = function (req ,res) {

    objectPersistence.delete(
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(404).json({"message":err});
            } else {
                res.status(200).json(result);
            }
        }
    );
}

