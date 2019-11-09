const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		minlength: 5
	},
	number: {
		type: String,
		required: true,
		minlength: 8
	}
}).set('toJSON', {
	transform: (doc, returnObject) => {
		returnObject.id = returnObject._id.toString();
		delete returnObject._id;
		delete returnObject.__v;
	}
}).plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);