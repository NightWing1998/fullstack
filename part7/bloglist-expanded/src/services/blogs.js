import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (tokenFromBackend) => {
	token = `bearer ${tokenFromBackend}`;
}

const getAll = async () => {
	const config = {
		headers: {
			Authorization: token
		},
	};
	try {
		const response = await axios.get(baseUrl, config);
		return response.data;
	} catch (err) {
		throw err;
	}
};

const createBlog = async (blog) => {
	const config = {
		headers: {
			Authorization: token
		},
	}
	const createdBlog = await axios.post(baseUrl, blog, config);
	return createdBlog.data;
}

const updateBlog = async (blog) => {
	const config = {
		headers: {
			Authorization: token
		},
	};
	let editedBlog = {
		...blog
	};
	editedBlog.user = editedBlog.user.id;
	const updatedBlog = await axios.put(`${baseUrl}/${blog.id}`, editedBlog, config);
	return updatedBlog.data;
}

const deleteBlog = async (blog) => {
	const config = {
		headers: {
			Authorization: token
		},
	};
	await axios.delete(`${baseUrl}/${blog.id}`, config);
}

export default {
	getAll,
	createBlog,
	setToken,
	updateBlog,
	deleteBlog
};