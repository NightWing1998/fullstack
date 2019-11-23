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

describe("GET /api/blog route test", () => {
	test("checking content type of GET /api/blog", async () => {
		await api.get("/api/blog")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("blog api GET /api/blog test", async () => {
		const response = await api.get("/api/blog");

		expect(response.body.length).toBe(blogHelper.initialBlog.length);
	});
});

test("testing if the blog returns the unique key aka 'id'", async () => {
	const blogs = await blogHelper.blogsInDb();

	expect(blogs[0].id).toBeDefined();
});

describe("testing the /api/blog POST route", () => {
	test("adding a blog.....", async () => {
		const addBlog = {
			title: "Type wars",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
			likes: 2,
		};

		const savedBlog = (await api.post("/api/blog").send(addBlog).expect(201).expect("Content-Type", /application\/json/)).body;

		delete savedBlog.id;
		expect(savedBlog).toEqual(addBlog);

		const allBlogs = await blogHelper.blogsInDb();

		expect(allBlogs.length).toBe(blogHelper.initialBlog.length + 1);
	});

	test("testing without sending likes.....", async () => {
		const addBlog = {
			title: "Type wars",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		};

		const savedBlog = (await api.post("/api/blog").send(addBlog).expect(201).expect("Content-Type", /application\/json/)).body;
		delete savedBlog.id;

		addBlog.likes = 0;
		expect(savedBlog).toEqual(addBlog);

		const allBlogs = await blogHelper.blogsInDb();

		expect(allBlogs.length).toBe(blogHelper.initialBlog.length + 1);
	});

	test("testing a request without url", async () => {
		const addBlog = {
			title: "Type wars",
			author: "Robert C. Martin",
		};

		await api.post("/api/blog").send(addBlog).expect(400);

	});

	test("testing a request without title", async () => {
		const addBlog = {
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
		};

		await api.post("/api/blog").send(addBlog).expect(400);
	});
});

describe("Delete /api/blog", () => {
	test("deleting a blog....", async () => {
		const blogs = await blogHelper.blogsInDb();

		const idToDelete = blogs[0].id;
		await api.delete(`/api/blog/${idToDelete}`).expect(204);

		const response = await blogHelper.blogsInDb();
		expect(response.length).toBe(blogHelper.initialBlog.length - 1);
	});

	test("trying to delete a blog that does not exist", async () => {
		const missingId = await blogHelper.nonExistentId();

		await api.delete(`/api/blog/${missingId}`).expect(400);
	});
});

describe("PUT /api/blog", () => {
	test("Updating a blog....", async () => {
		const blogs = await blogHelper.blogsInDb();

		const updatingBlog = blogs[0];
		updatingBlog.likes += 5;

		const newBlog = await api.put(`/api/blog/${updatingBlog.id}`).send(updatingBlog).expect(201).expect("Content-Type", /application\/json/);

		expect(newBlog.body).toEqual(updatingBlog);
	});

	test("Trying to update a deleted blog.....", async () => {
		const deletedId = await blogHelper.nonExistentId();

		const blog = {
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 12,
		}

		await api.delete(`/api/blog/${deletedId}`).send(blog).expect(400);
	});
});

afterAll(() => {
	mongoose.connection.close();
});