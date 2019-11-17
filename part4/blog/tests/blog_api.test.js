const
	supertest = require("supertest"),
	app = require("../app"),
	mongoose = require("mongoose"),
	Blog = require("../models/blog"),
	blogHelper = require("./blog_helper");

const api = supertest(app);

beforeEach(async () => {
	await blogHelper.removeAll();
	// console.log("cleared");
	for (let blog of blogHelper.initialBlog) {
		let newBlog = new Blog(blog);
		await newBlog.save();
		// console.log("saved");
	}
	// console.log("done");
});

test("checking content type of GET /api/blogs", async () => {
	await api.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("blog api GET /api/blogs test", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body.length).toBe(blogHelper.initialBlog.length);
});

afterAll(() => {
	mongoose.connection.close()
});