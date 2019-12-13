import axios from "axios";

const baseUrl = "/anecdotes";

export const getAllAnecdotes = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};

export const updateAnecdote = async (id, obj) => {
	const res = await axios.patch(`${baseUrl}/${id}`, obj);
	return res.data;
};

export const createAnecdote = async content => {
	const newAnecdote = {
		content,
		votes: 0
	};
	const res = await axios.post(baseUrl, newAnecdote);
	return res.data;
}

export const getAnecdoteById = async id => {
	const res = await axios.get(`${baseUrl}/${id}`);
	return res.data;
}

export default {
	getAllAnecdotes,
	updateAnecdote,
	createAnecdote,
	getAnecdoteById
};