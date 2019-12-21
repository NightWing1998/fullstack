import blogService from "../services/blogs";

const reducer = (state = [], action) => {
	switch (action.type) {
	case "NEW_BLOG":
		return [...state, action.blog];
	case "UPDATE_BLOG":
		return state.map(blog => blog.id === action.blog.id ? action.blog : blog);
	case "REMOVE_BLOG":
		return state.filter(blog => blog.id !== action.blog.id);
	case "INITIALISE_BLOGS":
		return action.blogs;
	default:
		return state;
	}
};

export default reducer;

export const create = blog => (
	async dispatch => {
		const newBlog = await blogService.createBlog(blog);
		dispatch({
			type: "NEW_BLOG",
			blog: newBlog
		});
	}
);

export const remove = blog => (
	async dispatch => {
		await blogService.deleteBlog(blog);
		dispatch({
			type: "REMOVE_BLOG",
			blog
		});
	}
);

export const update = blog => (
	async dispatch => {
		const updatedBlog = await blogService.updateBlog(blog);
		console.log("blog from server--", updatedBlog);
		dispatch({
			type: "UPDATE_BLOG",
			blog: updatedBlog
		});
	}
);

export const comment = (comment, id) => (
	async dispatch => {
		const blogWithComment = await blogService.commentOnBlog(comment, id);
		dispatch({
			type: "UPDATE_BLOG",
			blog: blogWithComment
		});
	}
);

export const initialiseBlogs = () => (
	async dispatch => {
		const blogs = await blogService.getAll();
		dispatch({
			type: "INITIALISE_BLOGS",
			blogs
		});
	}
);