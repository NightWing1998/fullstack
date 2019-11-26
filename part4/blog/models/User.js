const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	name: {
		type: String,
		required: true
	},
	passowrdHash: {
		type: String,
	}
}).set("toJSON", {
	transform: (doc, returnedDocument) => {
		returnedDocument.id = returnedDocument._id.toString();
		delete returnedDocument._id;
		delete returnedDocument.__v;
		delete returnedDocument.passowrdHash;
	}
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User", userSchema);