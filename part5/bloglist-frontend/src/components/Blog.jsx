import React, { useState } from "react";
import blogServices from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, createError, createSuccess, userid, handleDelete }) => {

	const [like, setLike] = useState(blog.likes);

	const updateLike = async (event) => {
		event.preventDefault();
		blog.likes = like + 1;
		try {
			blog = await blogServices.updateBlog(blog);
			setLike(like + 1);
			createSuccess("Like updated");
		} catch (err) {
			console.log(err);
			createError("Couldn't update likes. Try again later.");
		}
	}

	const confirmBeforeDelete = () => {
		let res = window.confirm(`Are you sure you want to delete blog - ${blog.title}`);
		if (res) {
			handleDelete(blog);
		}
	}

	return (
		<div className="blog">
			<ToggleComponenet>
				<div className="blog__header">
					{blog.title} - {blog.author}
				</div>
				<div className="blog__footer">
					<div className="blog__url">
						<a href={blog.url} target="_blank" rel="noopener noreferrer">
							{blog.url}
						</a>
					</div>
					<div className="blog__like">
						{like}
						<button onClick={updateLike}>Like</button>
					</div>
					<div className="blog__owner">
						added by {blog.user.name}
						{blog.user.id === userid ?
							<button style={{ backgroundColor: "blue", color: "white", borderRadius: 5 }} onClick={confirmBeforeDelete}>
								Delete
							</button>
							:
							<></>
						}
					</div>
				</div>
			</ToggleComponenet>
		</div>
	)
};

const ToggleComponenet = props => {
	const [visisble, setVisible] = useState(false);

	const showStyle = { display: visisble ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visisble);
	}

	return (
		<div className="toggle__blog" >
			<div className="staticPart" onClick={toggleVisibility}>
				{props.children[0]}
			</div>
			<div style={showStyle}>
				{props.children[1]}
			</div>
		</div>
	)
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	createError: PropTypes.func.isRequired,
	createSuccess: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired
}

export default Blog;