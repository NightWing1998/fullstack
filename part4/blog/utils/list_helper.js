const _ = require("lodash");

const dummy = () => 1; // eslint won't allow parameter blogs since it is not used

const totalLikes = (blogs) => blogs.length === 0 ? 0 : blogs.reduce((previousValue, currentValue) => (previousValue + currentValue.likes), 0);

const favoriteBlog = blogs => blogs.length === 0 ? {} : blogs.reduce((pv, cv) => pv.likes > cv.likes ? pv : cv, blogs[0]);

const mostBlogs = blogs => {
	const aBMap = _.countBy(blogs, (blog) => blog.author);
	const authorBlogCount = _.keys(aBMap).map(author => {
		return {
			author,
			count: aBMap[author]
		};
	});
	return authorBlogCount.reduce((pv, cv) => pv.count > cv.count ? pv : cv, {});
};

const mostLikes = blogs => {
	const aLMap = _.groupBy(blogs, blog => blog.author);
	console.log(aLMap);
	const authorLikeCount = _.keys(aLMap).map(author => {
		return {
			author,
			likes: aLMap[author].reduce((pv, cv) => pv + cv.likes, 0)
		};
	});
	return authorLikeCount.reduce((pv, cv) => pv.likes > cv.likes ? pv : cv, {});
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
};