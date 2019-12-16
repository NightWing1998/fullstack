import React from "react";

import BlogForm from "./newBlogForm";
import ToggleableComponent from "./ToggleableComponent";

import { remove as deleteBlog, update as updateBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const Blog = ({ blog, userid, updateLike, handleDelete }) => {

	const confirmBeforeDelete = () => {
		let res = window.confirm(`Are you sure you want to delete blog - ${blog.title}`);
		if (res) {
			handleDelete(blog);
		}
	}

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
					{blog.user.id === userid ?
						<button style={{ backgroundColor: "blue", color: "white", borderRadius: 5 }} onClick={confirmBeforeDelete}>
							Delete
							</button>
						:
						<></>
					}
				</div>
			</div>
		</div>
	)
};

const Blogs = props => {
	const { blogs, user, deleteBlog, setNotification, updateBlog } = props;

	if (user === null || blogs === null) {
		console.log("null received.returning...");
		return <></>;
	}

	const handleBlogDelete = async (blog) => {
		try {
			await deleteBlog(blog);
			setNotification(`Successfully deleted blog - ${blog.title}`, "success", 5);
		} catch (err) {
			setNotification(`Could'nt delete blog. Some error occured. ${err}`, "error", 5);
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

	const blogFormToggleRender = () => {
		return (
			<ToggleableComponent clickToShowText="Create New Blog" clickToHideText="Cancel">
				<BlogForm />
			</ToggleableComponent>
		)
	};

	const mapIdToBlog = id => blogs.find(blog => blog.id === id);

	return (
		<Router>
			<div className="blogs">
				<Route exact path="/blogs" >
					<div>
						{blogFormToggleRender()}
						<ul>
							{blogs.map(blog => (
								<li key={blog.id} className="blog">
									<Link to={`/blogs/${blog.id}`} className="blog__header" >{`${blog.title} - ${blog.author}`}</Link>
								</li>
							))}
						</ul>
					</div>
				</Route>
				<Route
					exact
					path="/blogs/:id"
					render={({ match }) => {
						const blog = mapIdToBlog(match.params.id);
						return <Blog
							blog={blog}
							key={blog.id}
							handleDelete={handleBlogDelete}
							userid={user.id}
							setNotification={setNotification}
							updateLike={updateLike}
						/>;
					}}
				/>
			</div>
		</Router>
	);

};

const mapStateToProps = state => ({
	blogs: state.blogs.sort((a, b) => b.likes - a.likes),
	user: state.user
});

const mapDispatchToProps = {
	deleteBlog,
	setNotification,
	updateBlog
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);