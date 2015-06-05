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
  
exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body;
    console.log('Updating object: ' + id);
    console.log(JSON.stringify(object));
    db.collection(collectionName, function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, object, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating object: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(object);
            }
        });
    });
}
 
exports.delete = function(req, res) {
    var id = req.params.id;
    console.log('Deleting object: ' + id);
    db.collection(collectionName, function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}







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
 
exports.gets = function(callback) {
    collection.find().toArray(function(err, items) {
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
