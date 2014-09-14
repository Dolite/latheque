/*********************** Classe **************************/

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ObjectSchema   = new Schema({
	name: String,
	type: String
});

/********************** Méthodes *************************/

ObjectSchema.methods.create = function (attributes ,callback) {
	var obj = new objectModel();
	obj.name = attributes.name;
	obj.type = attributes.type;

	console.log("toto");

	// save the obj and check for errors
	obj.save( callback );
}

ObjectSchema.methods.getById = function (id, callback) {

	var query = objectModel.findById(id);
	query.exec( callback );
}

ObjectSchema.methods.remove = function (id ,callback) {
	objectModel.findByIdAndRemove(id, callback);
}

ObjectSchema.methods.getAttributes = function (callback) {
	objectModel.distinct(attribute, callback);
}

ObjectSchema.methods.getAttributeValues = function (attribute ,callback) {
	objectModel.distinct(attribute, callback);
}

/******* Création du modèle à partir du schéma ***********/

var objectModel = mongoose.model('Object', ObjectSchema);

/************ Mise à disposition du modèle ***************/

module.exports.model = objectModel;






/* Au cas où...
personSchema.virtual('name.full').get(function () {
  return this.name.full;
}).set(function(name) {
  var split = name.split(' ');
  this.name.first = split[0];
  this.name.last = split[1];
});
*/
