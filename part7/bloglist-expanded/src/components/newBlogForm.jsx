import React from "react";

import { useField } from "../hooks/index";

import { create as createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const Form = props => {

	const { createBlog, setNotification } = props;

	// BLOG FORM COMPONENTS
	const [title, titleReset] = useField("text");
	const [author, authorReset] = useField("text");
	const [url, urlReset] = useField("text");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await createBlog({
				url: url.value, title: title.value, author: author.value
			});
			setNotification(`Successfully created new blog - ${title.value}`, "success", 5);
			titleReset();
			authorReset();
			urlReset();
		} catch (err) {
			console.log(err);
			setNotification("Couldn't create blog. Please try again later.", "error", 5);
		}

	};

	return (
		<div>
			<h3>Create Blog</h3>
			<form onSubmit={handleSubmit}>
				<div>
					Title <input {...title} />
				</div>
				<div>
					Author <input {...author} />
				</div>
				<div>
					URL <input {...url} />
				</div>
				<div>
					<button type="submit">Create Blog</button>
				</div>
			</form>
		</div>
	);
};

const mapDispatchToProps = {
	createBlog,
	setNotification
};

export default connect(null, mapDispatchToProps)(Form);