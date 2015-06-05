var dblocale = [
    {
        "id":0,
        "type":"Série",
        "support":"Dématérialisé",
        "title":"Kaboul Kitchen",
        "season":1,
        "episodesnb":12,
        "complete":true
    },

    {
        "id":1,
        "type":"Film",
        "support":"DVD",
        "title":"Le bon, la brute et le truand",
        "year":1966,
        "time":177,
        "category":"Western"
    },

    {
        "id":2,
        "type":"Bande dessinée",
        "support":"Papier",
        "title":"Le Combat ordinaire",
        "serie":"Le combat ordinaire",
        "number":1,
        "year":2003
    },

    {
        "id":3,
        "type":"Jeu de société",
        "title":"Loony Quest",
        "playermin":"3",
        "playermax":"5",
        "category":"Dextérité",
        "key":["Dessin", "Orientation"],
        "time":20,
        "year":2015
    },

    {
        "id":4,
        "type":"Bande dessinée",
        "support":"Papier",
        "serie":"Le Combat ordinaire",
        "title":"Les quantités négligeables",
        "number":2,
        "year":2004
    }
];

exports.get = function(id, callback) {

    if (id < dblocale.length && dblocale[id] != null) {
        callback(null, dblocale[id]);
    } else {
        callback("No object with ID "+id+" in the database", null);
    }
};
 
exports.gets = function(callback) {
    var objs = new Array();
    for(i = 0; i < dblocale.length; i++) {
        if (dblocale[i] != null) {
            objs.push(dblocale[i]);
        }
    }
    callback(null, objs);
};
 
exports.add = function(object, callback) {

    object.id = dblocale.length;
    dblocale.push(object);

    callback(null, object);
}
 
exports.update = function(object, callback) {

    var id = object.id;

    if (id < dblocale.length && dblocale[id] != null) {
        object.id = id;
        dblocale[id] = object;
        callback(null, object);
    } else {
        callback("No object with ID "+id+" in the database", null);
    }
}
 
exports.delete = function(id, callback) {

    if (id < dblocale.length && dblocale[id] != null) {
        delete dblocale[id];
        callback(null, null);
    } else {
        callback("No object with ID "+id+" in the database", null);
    }
}
