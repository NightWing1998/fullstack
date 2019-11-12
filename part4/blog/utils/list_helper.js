const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.length === 0 ? 0 : blogs.reduce((previousValue, currentValue) => (previousValue + currentValue.likes), 0)

module.exports = {
	dummy
}