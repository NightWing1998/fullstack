import React from "react";
import { create, clear } from "../reducers/filterReducer";

const Filter = ({ store }) => {
	const handleChange = (event) => {
		const filter = event.target.value;
		store.dispatch(create(filter));
	};

	const handleClear = () => {
		store.dispatch(clear());
	}

	const style = {
		marginBottom: 10
	};

	return (
		<div style={style}>
			filter <input onChange={handleChange} value={store.getState().filter} />
			<button onClick={handleClear}>reset</button>
		</div>
	);
};

export default Filter;