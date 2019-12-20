import React from "react";

import CommentForm from "./commentForm";

import { remove as deleteBlog, update as updateBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

import { withRouter, Redirect } from "react-router-dom";

import { connect } from "react-redux";

const Blog = props => {

	const { blog, user, deleteBlog, setNotification, updateBlog } = props;

	if (!blog) {
		return <Redirect to="/blogs" />;
	}

	const handleBlogDelete = async (blog) => {
		try {
			await deleteBlog(blog);
			setNotification(`Successfully deleted blog - ${blog.title}`, "success", 5);
			props.history.push("/blogs");
		} catch (err) {
			setNotification(`Could'nt delete blog. Some error occured. ${err}`, "error", 5);
		}
	};

	const confirmBeforeDelete = () => {
		let res = window.confirm(`Are you sure you want to delete blog - ${blog.title}`);
		if (res) {
			handleBlogDelete(blog);
		}
	};

	const updateLike = async blog => {
		let changedBlog = { ...blog, likes: blog.likes + 1 };
		try {
			await updateBlog(changedBlog);
			setNotification("Like updated", "success", 1);
		} catch (err) {
			console.log("Like error: ", err);
			setNotification("Couldn't update likes. Try again later.", "error", 1);
		}
	};

	return (
		<div className="blog">
			<h2 className="blog__header">
				{blog.title} - {blog.author}
			</h2>
			<div className="blog__footer">
				<div className="blog__url">
					<a href={blog.url} target="_blank" rel="noopener noreferrer">
						{blog.url}
					</a>
				</div>
				<div className="blog__like">
					{blog.likes} likes
					<button onClick={() => updateLike(blog)}>Like</button>
				</div>
				<div className="blog__owner">
					added by {blog.user.name}
					{blog.user.id === user.id ?
						<button style={{ backgroundColor: "blue", color: "white", borderRadius: 5 }} onClick={confirmBeforeDelete}>
							Delete
							</button>
						:
						<></>
					}
				</div>
				<h2>Comments</h2>
				<CommentForm id={blog.id} />
				<div className="blog__comments">
					<ul>
						{blog.comments.map((comment, index) => (
							<li key={index} className="comment">
								{comment}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => ({
	blog: state.blogs.find(blog => blog.id === ownProps.id),
	user: state.user
});

const mapDispatchToProps = {
	deleteBlog,
	setNotification,
	updateBlog
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Blog));