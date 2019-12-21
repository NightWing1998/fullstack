import {
	getAll
} from "../services/userServices";

const reducer = (state = [], action) => {
	switch (action.type) {
	case "INITIALISE_USERS":
		return action.users;
	default:
		return state;
	}
};

export default reducer;

export const getAllUsers = () => (
	async dispatch => {
		const users = await getAll();
		dispatch({
			type: "INITIALISE_USERS",
			users
		});
	}
);