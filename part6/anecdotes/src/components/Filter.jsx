import React from "react";
import { connect } from "react-redux";
import { create, clear } from "../reducers/filterReducer";

const Filter = props => {
	const handleChange = (event) => {
		const filter = event.target.value;
		props.setFilter(filter)
	};

	const style = {
		marginBottom: 10
	};

	return (
		<div style={style}>
			filter <input onChange={handleChange} value={props.filter} />
			<button onClick={props.clearFilter}>reset</button>
		</div>
	);
};

const mapStateToProps = (state) => ({ filter: state.filter });
const mapDispatchToProps = {
	setFilter: create,
	clearFilter: clear
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);