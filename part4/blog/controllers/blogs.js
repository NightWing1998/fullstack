const
	router = require("express").Router(),
	Blog = require("../models/Blog"),
	User = require("../models/User"),
	config = require("../utils/config"),
	jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {

	if (!req.isAuthenticated) {
		return res.status(401).json({
			error: "Token missing or invalid"
		});
	}

	try {
		const blogs = await Blog.find({}).populate("user", {
			username: 1,
			name: 1
		});

		res.status(200).json(blogs.map(blog => blog.toJSON()));

	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	if (!req.isAuthenticated) {
		return res.status(401).json({
			error: "Token missing or invalid"
		});
	}
	try {
		const id = req.params.id;
		let blog = await Blog.findById(id).populate("user", {
			username: 1,
			name: 1
		});
		res.status(200).json(blog.toJSON());
	} catch (err) {
		next(err);
	}
});

router.post("/:id/comments", async (req, res, next) => {
	const id = req.params.id;
	try {
		const blog = (await Blog.findById(id)).toJSON();
		const comments = [...blog.comments, req.body.comment];
		const updatedBlog = await Blog.findByIdAndUpdate(id, {
			...blog,
			comments
		}, {
			new: true
		}).populate("users", {
			username: 1,
			name: 1
		});
		res.status(201).json(updatedBlog.toJSON());
	} catch (err) {
		next(err);
	};
});

router.post("/", async (req, res, next) => {

	if (!req.isAuthenticated) {
		return res.status(401).json({
			error: "Token missing or invalid"
		});
	}

	try {
		// Find userid from token
		const userFromToken = jwt.verify(req.token, config.JWT_SECRET);
		if (!userFromToken.id) {
			return res.status(401).json({
				error: "Token missing or invalid"
			});
		}
		// find user on the basis of token
		const user = await User.findById(userFromToken.id);
		if (user === null || user.username !== userFromToken.username) {
			return res.status(401).json({
				error: "Token missing or invalid"
			});
		}
		// add userid as user in blog
		let newBlog = req.body;
		newBlog.user = user._id;
		let blog = new Blog(newBlog);
		const savedBlog = (await blog.save()).toJSON();
		savedBlog.user = {
			username: user.username,
			name: user.name,
			id: user._id.toString()
		};
		// insert blog in user schema
		user.blogs = user.blogs.concat(savedBlog.id);
		await user.save();

		res.status(201).json(savedBlog);
	} catch (err) {
		next(err);
	}

});

router.delete("/:id", async (req, res, next) => {

	if (!req.isAuthenticated) {
		return res.status(401).json({
			error: "Token missing or invalid"
		});
	}

	try {
		const userFromToken = jwt.verify(req.token, config.JWT_SECRET);
		if (!userFromToken.id) {
			return res.status(401).json({
				error: "Token missing or invalid"
			});
		}
		const user = await User.findById(userFromToken.id);

		if (user === null || user.username !== userFromToken.username) {
			return res.status(401).json({
				error: "Token missing or invalid"
			});
		}

		let id = req.params.id;
		let blog = await Blog.findById(id);
		if (blog === null) {
			return res.status(400).json({
				error: "Blog does not exist."
			})
		}
		if (blog.user.toString() !== userFromToken.id) {
			return res.status(401).json({
				error: "Error cannot delete blog. Invalid authentication."
			});
		}
		let response = await Blog.findByIdAndRemove(id);
		if (response === null) {
			return res.status(400).end();
		}
		user.blogs = user.blogs.filter(blog => blog.toString() !== response._id.toString());
		await user.save();
		res.status(204).end();
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