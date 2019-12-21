const router = require("express").Router();
const User = require("../models/User");
const Blog = require("../models/Blog");

router.post("/", async (req, res) => {
	await User.deleteMany({});
	await Blog.deleteMany({});

	res.status(204).end()
});

module.exports = router;