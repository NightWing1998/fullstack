const listHelper = require("../utils/list_helper");

const blogs = [{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}
];

test("dummy returns one", () => {
	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe("total likes", () => {
	const listWithOneBlog = [{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	}];

	test("when list has only one blog equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});

	test("the one with too many blogs", () => {
		const res = listHelper.totalLikes(blogs);
		expect(res).toBe(36);
	});

	test("empty list check", () => {
		expect(listHelper.totalLikes([])).toBe(0);
	});
});

describe("favorite blog", () => {

	test("too many blogs..", () => {
		const res = listHelper.favoriteBlog(blogs);
		expect(res).toEqual({
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		});
	});

	test("blog.length = 1", () => {
		expect(listHelper.favoriteBlog([blogs[0]])).toEqual(blogs[0]);
	})

	test("blog = None", () => {
		expect(listHelper.favoriteBlog([])).toEqual({});
	});

});

describe("most blogs", () => {

	test("more than one blog...", () => {
		const res = listHelper.mostBlogs(blogs);
		expect(res).toEqual({
			author: "Robert C. Martin",
			count: 3
		});
	});

	test("just one blog", () => {
		expect(listHelper.mostBlogs([blogs[0]])).toEqual({
			author: "Michael Chan",
			count: 1
		});
	})

	test("no blogs", () => {
		expect(listHelper.mostBlogs([])).toEqual({});
	});
});

describe("most likes", () => {

	test("more than one blog...", () => {
		const res = listHelper.mostLikes(blogs);
		expect(res).toEqual({
			author: "Edsger W. Dijkstra",
			likes: 17
		});
	});

	test("just one blog", () => {
		expect(listHelper.mostLikes([blogs[0]])).toEqual({
			author: "Michael Chan",
			likes: 7
		});
	})

	test("no blogs", () => {
		expect(listHelper.mostBlogs([])).toEqual({});
	});
});