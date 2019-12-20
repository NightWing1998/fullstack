import React from "react";
import { connect } from "react-redux";
import { comment as addComment } from "../reducers/blogReducer";
import { useField } from "../hooks";
import { setNotification } from "../reducers/notificationReducer";

import { Form, Button, Icon } from "semantic-ui-react";

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
		<Form onSubmit={handleComment} >
			<Form.Group inline>
				<Form.Input {...comment} />
				<Button icon type="submit" circular>
					<Icon name="add" />
				</Button>
			</Form.Group>
		</Form>
	);
};

const mapDispatchToProps = {
	addComment, setNotification
};

export default connect(null, mapDispatchToProps)(CommentForm);