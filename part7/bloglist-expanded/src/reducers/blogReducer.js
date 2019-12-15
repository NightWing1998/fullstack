import blogService from "../services/blogs";

const reducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_BLOG":
			return [...state, action.blog];
		case "UPDATE_BLOG":
			let id = action.blog.id;
			return state.map(blog => blog.id === id ? action.blog : blog);
		case "REMOVE_BLOG":
			let id = action.blog.id;
			return state.filter(blog => blog.id !== id);
		case "INITIALISE_BLOGS":
			return action.blogs;
		default:
			return state;
	};
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
		dispatch({
			type: "UPDATE_BLOG",
			blog: updatedBlog
		});
	}
);

export const initialiseBlgos = () => (
	async dispatch => {
		const blogs = await blogService.getAll();
		dispatch({
			type: "INITIALISE_BLOGS",
			blogs
		});
	}
);