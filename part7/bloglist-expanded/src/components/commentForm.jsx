import React from "react";
import { connect } from "react-redux";
import { comment as addComment } from "../reducers/blogReducer";
import { useField } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";

const CommentForm = props => {

	const { id, addComment, setNotification } = props;
	const [comment, resetComment] = useField("text");

	const handleComment = async event => {
		event.preventDefault();
		try {
			await addComment(comment.value, id);
			setNotification(`Comment ${comment.value} added`, "success", 5);
			resetComment();
		} catch (err) {
			setNotification(`Err - ${err.toString()}`, "error", 5);
		}
	}

	return (
		<form onSubmit={handleComment}>
			<input {...comment} />
			<button type="submit">Add comment</button>
			<button type="reset" onClick={resetComment}>Clear comment</button>
		</form>
	);
};

const mapDispatchToProps = {
	addComment, setNotification
};

export default connect(null, mapDispatchToProps)(CommentForm);