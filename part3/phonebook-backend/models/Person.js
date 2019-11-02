const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	name: String,
	number: String
}).set('toJSON', {
	transform: (doc, returnObject) => {
		returnObject.id = returnObject._id.toString()
		delete returnObject._id
		delete returnObject.__v
	}
});

module.exports = mongoose.model('Person', personSchema);