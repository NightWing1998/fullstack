const reducer = (state = null, action) => {
	switch (action.type) {
		case "SET_NOTIFICATION":
			return {
				message: action.message, category: action.category
			};
		case "RESET":
			return null;
		default:
			return state;
	}
};

const createNotification = (message, category) => ({
	type: "SET_NOTIFICATION",
	message,
	category
});

const resetNotification = () => ({
	type: "RESET"
});

export const setNotification = (message, category, secs) => (
	dispatch => {
		dispatch(createNotification(message.toString(), category));
		setTimeout(() => dispatch(resetNotification()), secs * 1000);
	}
);

export default reducer;