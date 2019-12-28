const mongoose = require('mongoose');
const uniquePlugin = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		minlength: 2
	},
	published: {
		type: Number,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Author'
	},
	genres: [{
		type: String
	}]
}).plugin(uniquePlugin);

module.exports = mongoose.model('Book', schema);