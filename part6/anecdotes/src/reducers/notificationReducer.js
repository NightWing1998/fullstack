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

export const setNotification = (message) => ({
	type: "SET_NOTIFICATION",
	notification: message
});

export const resetNotification = () => ({
	type: "RESET"
});

export default reducer;