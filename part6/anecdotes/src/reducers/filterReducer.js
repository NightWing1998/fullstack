const reducer = (state = "", action) => {
	switch (action.type) {
		case "SET_FILTER":
			return action.filter;
		case "CLEAR_FILTER":
			return "";
		default:
			return state;
	};
};

export default reducer;

export const setFilter = filter => ({
	type: "SET_FILTER",
	filter
});

export const clearFilter = () => ({
	type: "CLEAR_FILTER"
});