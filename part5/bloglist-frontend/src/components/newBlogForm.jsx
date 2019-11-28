import React from "react";

const form = ({ title, setTitle, author, setAuthor, url, setUrl, handleSubmit }) => (
	<div>
		<h3>Create Blog</h3>
		<form onSubmit={handleSubmit}>
			<div>
				Title <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} data-aria="title" />
			</div>
			<div>
				Author <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} data-aria="author" />
			</div>
			<div>
				URL <input type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} data-aria="url" />
			</div>
			<div>
				<button type="submit">Create Blog</button>
			</div>
		</form>
	</div>
);

export default form;