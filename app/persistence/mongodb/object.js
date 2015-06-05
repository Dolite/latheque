/******************* DEFINITION DE LA BASE DE DONNEES ************************/

var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var serverMongodb = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('dbtheque', serverMongodb);

// On ouvre la connexion à la base de donnée, et on vérifie l'existence de la collection 'objects'
var collectionName = "objects";

db.open(
    function(err, db) {
        if(! err) {
            console.log("Connected to 'dbtheque' database");
            db.collection(collectionName, {strict:true}, function(err, collection) {
                if (err) {
                    console.log("No collection : " + collectionName);
                    process.exit(1);
                }
            });
        } else {
            console.log("Impossible to connect to 'dbtheque' database : "+err);
            process.exit(1);            
        }
    }
);

var collection = db.collection(collectionName);

/******************* METHODES SUR LA BASE DE DONNEES ************************/

exports.get = function(id, callback) {
    collection.findOne(
        {'_id':new BSON.ObjectID(id)},
        function(err, item) {
            if (err) {
                console.error(err);
                callback("No object with ID "+id+" in the database", null);
            } else {
                callback(null, item);
            }
        }
    );
};
 
exports.gets = function(filter, callback) {

    var mongodbFilter = new Object();
    var filteredAttributes = Object.keys(filter);
    for (var i = 0; i < filteredAttributes.length; i++) {
        var filteredAtt = filteredAttributes[i];
        mongodbFilter[filteredAtt] = "/"+filter[filteredAtt]+"/";
    }

    console.log(JSON.stringify(mongodbFilter));

    collection.find(JSON.stringify(mongodbFilter), "{ _id: 1, type: 1, title: 1 }").toArray(function(err, items) {
        if (err) {
            console.error(err);
            callback("No object in the database ?", null);
        } else {
            callback(null, items);
        }
    });
};
 
exports.add = function(object, callback) {
    collection.insert(
        object,
        {safe:true},
        function(err, result) {
            if (err) {
                console.error(err);
                callback("Impossible to add a new object", null);
            } else {
                callback(null, result);
            }
        }
    );
}
 
exports.update = function(object, callback) {

    var object = req.body;
    var id = object.id;

    collection.update(
        {'_id':new BSON.ObjectID(id)},
        object,
        {safe:true},
        function(err, result) {
            if (err) {
                console.error(err);
                callback("No object with this ID in the database ?", null);
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
                callback("No object with ID "+id+" in the database", null);
            } else {
                callback(null, null);
            }
        }
    );
}
