const reducer = (state = null, action) => {
	switch (action.type) {
		case "SET_NOTIFICATION":
			return action.notification;
		case "RESET":
			return null;
		default:
			return state;
	}
};

const createNotification = (message) => ({
	type: "SET_NOTIFICATION",
	notification: message
});

const resetNotification = () => ({
	type: "RESET"
});

export const setNotification = (message, secs) => (
	async dispatch => {
		dispatch(createNotification(message));
		setTimeout(() => dispatch(resetNotification()), secs * 1000);
	}
);

export default reducer;