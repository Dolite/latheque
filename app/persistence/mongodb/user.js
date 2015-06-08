/******************* DEFINITION DE COLLECTION ************************/

var conn = require('./connection');
var BSON = require('bson').BSONPure;

// On ouvre la connexion à la base de donnée, et on vérifie l'existence de la collection 'users'
var collectionName = "users";

var findAllProjection = {
    _id: 1,
    name: 1
};

var collection = conn.connect(collectionName);

/******************* METHODES SUR LA BASE DE DONNEES ************************/

exports.get = function(id, callback) {

    collection.findOne(
        {'_id':new BSON.ObjectID(id)},
        function(err, item) {
            if (err) {
                console.error(err);
                callback("No user with ID "+id+" in the database", null);
            } else {
                callback(null, item);
            }
        }
    );
};
 
exports.gets = function(filter, callback) {

    var mongodbFilter = new Object();

    if (filter != null) {
        var mongodbFilter = new Object();
        var filteredAttributes = Object.keys(filter);
        for (var i = 0; i < filteredAttributes.length; i++) {
            var filteredAtt = filteredAttributes[i];
            mongodbFilter[filteredAtt] = "/"+filter[filteredAtt]+"/";
        }
    }

    //console.log(mongodbFilterString);

    collection.find(mongodbFilter, findAllProjection).toArray(function(err, items) {
        if (err) {
            console.error(err);
            callback("No user in the database ?", null);
        } else {
            callback(null, items);
        }
    });
};
 
exports.add = function(user, callback) {
    collection.insert(
        user,
        {safe:true, multi:false},
        function(err, result) {
            if (err) {
                console.error(err);
                callback("Impossible to add a new user", null);
            } else {
                callback(null, result);
            }
        }
    );
}
 
exports.update = function(id, user, callback) {

    collection.update(
        {'_id':new BSON.ObjectID(id)},
        user,
        {safe:true, multi:false},
        function(err, result) {
            if (err) {
                console.error(err);
                callback("Do not precise _id of the updated user in the body", null);
            } else {
                callback(null, result);
            }
        }
    );
}
 
exports.delete = function(id, callback) {

    collection.remove(
        {'_id':new BSON.ObjectID(id)},
        {safe:true},
        function(err, result) {
            if (err) {
                console.error(err);
                callback("No user with ID "+id+" in the database", null);
            } else {
                callback(null, null);
            }
        }
    );
}
