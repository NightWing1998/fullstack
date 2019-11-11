const
	router = require("express").Router(),
	Blog = require("../models/blog");

router.get("/", (req, res) => {
	Blog.find({})
		.then(blogs => blogs.map(blog => blog.toJSON()))
		.then(jsonBlogs => res.status(200).json(jsonBlogs));
});

router.post("/", (req, res) => {
	let blog = new Blog(req.body);
	blog.save()
		.then(savedBlog => savedBlog.toJSON())
		.then(jsonBlog => res.status(201).json(jsonBlog));
});

module.exports = router;