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
	passwordHash: {
		type: String,
	},
	blogs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Blog",
	}]
}).set("toJSON", {
	transform: (doc, returnedDocument) => {
		returnedDocument.id = returnedDocument._id.toString();
		delete returnedDocument._id;
		delete returnedDocument.__v;
		delete returnedDocument.passwordHash;
		// delete returnedDocument.blogs;
	}
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User", userSchema);