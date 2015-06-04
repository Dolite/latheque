var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var serverMongodb = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('dbtheque', serverMongodb);
 
db.open(function(err, db) {
    if(! err) {
        console.log("Connected to 'dbtheque' database");
        db.collection('objects', {strict:true}, function(err, collection) {
            if (err) {
                console.log("Impossible to connect to 'dbtheque' mongodb database, 'objects' collection : "+err);
                process.exit(1);
            }
        });
    }
});
 
exports.get = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving object: ' + id);
    db.collection('objects', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.gets = function(req, res) {
    db.collection('objects', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.add = function(req, res) {
    var object = req.body;
    console.log('Adding object: ' + JSON.stringify(object));

    var collection = db.collection('objects');

    collection.insert(
        object,
        {safe:true},
        function(err, result) {
            if (err) {
                console.log('\tError !');
                res.send({'error':'An error has occurred'});
            } else {
                console.log('\tSuccess !');
                res.send(result);
            }
        }
    );
}
 
exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body;
    console.log('Updating object: ' + id);
    console.log(JSON.stringify(object));
    db.collection('objects', function(err, collection) {
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
    db.collection('objects', function(err, collection) {
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
