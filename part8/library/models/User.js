const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
	},
	favoriteGenre: String,
	password: {
		type: String,
		required: true,
		default: "password",
		minlength: 8
	}
}).plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);