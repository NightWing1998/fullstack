import userServices from "../services/userServices";
import blogService from "../services/blogs";

const reducer = (state = null, action) => {
	switch (action.type) {
		case "LOGIN":
			return action.user;
		case "LOGOUT":
			return null;
		case "CACHE":
			return action.user;
		default:
			return state;
	}
};

export default reducer;

const settlingUser = (userData) => {
	if (userData !== null) {
		blogService.setToken(userData.token);
	} else {
		blogService.setToken(null);
	}
};

export const login = creds => (
	async dispatch => {
		const user = await userServices.login(creds);
		settlingUser(user);
		localStorage.setItem("user", JSON.stringify(user));
		dispatch({
			type: "LOGIN",
			user
		});
	}
);

export const logout = () => (
	dispatch => {
		localStorage.removeItem("user");
		// localStorage.removeItem("token");
		settlingUser(null);
		dispatch({
			type: "LOGOUT"
		});
	}
);

export const cachedUser = user => (
	dispatch => {
		settlingUser(JSON.parse(user));
		dispatch({
			type: "CACHE",
			user: JSON.parse(user)
		});
	}
);