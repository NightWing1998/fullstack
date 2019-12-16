import axios from "axios";
const loginUrl = "/api/login";

export const login = async creds => {
	const userData = await axios.post(loginUrl, creds);
	return userData.data;
};

export default {
	login
};