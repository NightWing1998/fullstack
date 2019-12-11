import React from "react";
import PropTypes from "prop-types";

const form = ({ title, author, url, handleSubmit }) => (
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

form.propTypes = {
	title: PropTypes.object.isRequired,
	author: PropTypes.object.isRequired,
	url: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
}

export default form;