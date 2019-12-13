import React from "react";
import { connect } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import { setNotification, resetNotification } from "../reducers/notificationReducer";

const AnecdoteForm = props => {
	const handleCreate = event => {
		event.preventDefault();
		const content = event.target.content.value;
		event.target.content.value = "";
		props.createAnecdote(content);
		props.setNotification(`You created '${content}'`);

	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleCreate}>
				<div><input type="text" name="content" id="content" /></div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		createAnecdote: content => dispatch(create(content)),
		setNotification: message => {
			dispatch(setNotification(message));
			setTimeout(() => dispatch(resetNotification()), 5000);
		}
	};
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);