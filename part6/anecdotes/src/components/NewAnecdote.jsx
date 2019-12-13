import React from "react";
import { create } from "../reducers/anecdoteReducer";
import { createNotification } from "./Notification";

const AnecdoteForm = ({ store }) => {
	const handleCreate = event => {
		event.preventDefault();
		const content = event.target.content.value;
		event.target.content.value = "";
		store.dispatch(create(content));
		createNotification(store, `You created '${content}'`);

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

export default AnecdoteForm;