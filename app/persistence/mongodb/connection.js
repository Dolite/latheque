/******************* CONNECTION À LA BASE DE DONNEES ************************/

var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;

var dbName = 'dbtheque';
 
var serverMongodb = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db(dbName, serverMongodb);

module.exports.connect = function (collectionName) {

    db.open(
        function(err, db) {
            if(err) {
                console.log("Impossible to connect to '" + dbName + "' database : "+err);
                process.exit(1); 
            } else {
                dbok = true;
                console.log("Connection to 'dbtheque' OK ");   
                db.collection(collectionName, {strict:true}, function(err, collection) {
                    if (err) {
                        console.log("No collection : " + collectionName);
                        process.exit(1);
                    } else {
                        console.log("Collection '" + collectionName + "' OK !");
                    }
                });    
            }
        }
    );

    return db.collection(collectionName);

}

