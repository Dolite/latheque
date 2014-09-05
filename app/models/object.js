/**************** Classe ********************/

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ObjectSchema   = new Schema({
	name: String,
	type: String,
});

var objectModel = mongoose.model('Object', ObjectSchema);

/*************** Fonctions ******************/

var getById = function (id, callback) {

	var query = objectModel.findById(id);
	query.exec( callback );
}

module.exports.getById = getById;

var create = function (attributes ,callback) {
	var obj = new objectModel();
	obj.name = attributes.name;
	obj.type = attributes.type;

	// save the obj and check for errors
	obj.save( callback );
}

module.exports.create = create;

var remove = function (id ,callback) {
	objectModel.findByIdAndRemove(id, callback);
}

module.exports.remove = remove;

var getAttributes = function (callback) {
	objectModel.distinct(attribute, callback);
}

module.exports.getAttributes = getAttributes;

var getAttributeValues = function (attribute ,callback) {
	objectModel.distinct(attribute, callback);
}

module.exports.getAttributeValues = getAttributeValues;




