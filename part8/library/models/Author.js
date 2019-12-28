const mongoose = require('mongoose');
const uniquePlugin = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 4
	},
	born: {
		type: Number,
	},
}).plugin(uniquePlugin);

module.exports = mongoose.model('Author', schema);