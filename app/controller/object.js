var objectModel = require('../models/object').model;

var create = function (req ,res) {

	// Contrôles des champs obligatoires

	if (req.body.name == null) {
		res.status(400).json({message:"Attribute 'name' is mandatory to create a new object"});
		return;
	}

	if (req.body.type == null) {
		res.status(400).json({message:"Attribute 'type' is mandatory to create a new object"});
		return;
	}

	objectModel.create(
		req.body,
		function(err, obj) {

			if (err) {
				res.status(500).json({message:"Database error: " + err});
				return;
			}
			
			res.status(200).json({message:"Successfully created", object:obj});
		}
	);
}

module.exports.create = create;

var remove = function (req ,res) {

	objectModel.remove(
		req.params.id,
		function(err, obj) {

			if (err) {
				res.status(500).json({message:"Database error: " + err});
				return;
			}

			if (obj == null) {
				res.status(404).json({message:"No object to remove with this ID"});
				return;
			}
			
			res.status(200).json({message:"Successfully removed", object:obj});
		}
	);

}

module.exports.remove = remove;


var getById = function (req ,res) {

	objectModel.getById(
		req.params.id,
		function(err, obj) {

			if (err) {
				res.status(500).json({message:"Database error: " + err});
				return;
			}

			if (obj == null) {
				res.status(404).json({message:"No object with this ID"});
				return;
			}
			
			res.status(200).json(obj);
		}
	);
}

module.exports.getById = getById;

var getListAttributes = function (req ,res) {
	objectModel.getAttributes(
		function(err, obj) {

			if (err) {
				res.status(500).json({message:"Database error: " + err});
				return;
			}
			
			res.status(200).json(obj);
		}
	);
}

module.exports.getListAttributes = getListAttributes;

var getListAttributeValues = function (req ,res) {
	objectModel.getAttributeValues(
		req.params.attribute,
		function(err, obj) {

			if (err) {
				res.status(500).json({message:"Database error: " + err});
				return;
			}
			
			res.status(200).json(obj);
		}
	);
}

module.exports.getListAttributeValues = getListAttributeValues;



