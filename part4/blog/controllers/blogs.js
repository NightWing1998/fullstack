const
	router = require("express").Router(),
	Blog = require("../models/blog");

router.get("/", async (req, res) => {

	const blogs = await Blog.find({});

	res.status(200).json(blogs.map(blog => blog.toJSON()));

	// Blog.find({})
	// 	.then(blogs => blogs.map(blog => blog.toJSON()))
	// 	.then(jsonBlogs => res.status(200).json(jsonBlogs));
});

router.post("/", async (req, res) => {
	let blog = new Blog(req.body);
	const savedBlog = await blog.save();

	res.status(201).json(savedBlog.toJSON());

	// blog.save()
	// 	.then(savedBlog => savedBlog.toJSON())
	// 	.then(jsonBlog => res.status(201).json(jsonBlog));
});

module.exports = router;