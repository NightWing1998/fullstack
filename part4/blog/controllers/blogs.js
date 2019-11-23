const
	router = require("express").Router(),
	Blog = require("../models/blog");

router.get("/", async (req, res, next) => {

	try {
		const blogs = await Blog.find({});

		res.status(200).json(blogs.map(blog => blog.toJSON()));

	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		let blog = await Blog.findById(id);
		res.status(200).json(blog.toJSON());
	} catch (err) {
		next(err);
	}
});

router.post("/", async (req, res, next) => {

	try {
		let blog = new Blog(req.body);
		const savedBlog = await blog.save();

		res.status(201).json(savedBlog.toJSON());
	} catch (err) {
		next(err);
	}

});

router.delete("/:id", async (req, res, next) => {
	try {
		let id = req.params.id;
		let response = await Blog.findByIdAndRemove(id);
		if (response === null) res.status(400).end();
		else res.status(204).end();
	} catch (err) {
		next(err);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
			new: true
		});
		res.status(201).json(updatedBlog.toJSON());
	} catch (err) {
		next(err);
	}
});

module.exports = router;