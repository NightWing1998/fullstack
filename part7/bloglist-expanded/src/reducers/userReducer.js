import userServices from "../services/userServices";

const reducer = (state = null, action) => {
	switch (action.type) {
		case "LOGIN":
			return action.user;
		case "LOGOUT":
			return null;
		default:
			return state;
	}
};

export default reducer;

export const login = creds => (
	async dispatch => {
		const user = await userServices.login(creds);
		dispatch({
			type: "LOGIN",
			user
		});
	}
);

export const logout = () => ({
	type: "LOGOUT"
});