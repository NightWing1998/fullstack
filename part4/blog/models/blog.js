const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: String,
	url: {
		type: String,
		required: true
	},
	likes: {
		type: Number,
		required: true,
		default: 0
	}
}).set("toJSON", {
	transform: (doc, returnObject) => {
		returnObject.id = returnObject._id.toString();
		delete returnObject._id;
		delete returnObject.__v;
	}
});

module.exports = mongoose.model("Blog", blogSchema);