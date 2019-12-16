import axios from "axios";
const userUrl = "/api/users";

export const getAll = async () => {
	const users = await axios.get(userUrl);
	return users.data;
};

export default {
	getAll
};