import axios from "axios";
const baseUrl = "/api/blog";

let token = null;

const setToken = (tokenFromBackend) => {
	token = `bearer ${tokenFromBackend}`;
}

const getAll = async () => {
	try {
		const response = await axios.get(baseUrl);
		return response.data;
	} catch (err) {
		throw err;
	}
};

const createBlog = async (blog) => {
	const config = {
		headers: { Authorization: token },
	}
	const createdBlog = await axios.post(baseUrl, blog, config);
	console.log(createdBlog);
	return createdBlog.data;
}

export default { getAll, createBlog, setToken };