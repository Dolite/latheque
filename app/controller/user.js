var userPersistence = require('../persistence/mongodb/user');


function getMissingAttributes (obj) {
    var mandatoryAttributes = [
        'name'
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
    userPersistence.get(
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

    userPersistence.gets(
        req.query,
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

    var body = req.body;

    var missingAttributes = getMissingAttributes(body);

    if (missingAttributes.length != 0) {
        res.status(400).json({"message":"Attribut(s) manquant(s) pour la création : " + missingAttributes});
        return;
    }

    userPersistence.add(
        body,
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

    var body = req.body;

    var missingAttributes = getMissingAttributes(body);

    if (missingAttributes.length != 0) {
        res.status(400).json({"message":"Attribut(s) manquant(s) pour la mise à jour : " + missingAttributes});
        return;
    }

    userPersistence.update(
        req.params.id,
        body,
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

    userPersistence.delete(
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

