import React from "react";

import BlogForm from "./newBlogForm";
import ToggleableComponent from "./ToggleableComponent";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

const Blogs = props => {
	const { blogs, user } = props;

	if (user === null || blogs === null) {
		console.log("null received.returning...");
		return <></>;
	}

	const blogFormToggleRender = () => {
		return (
			<ToggleableComponent clickToShowText="Create New Blog" clickToHideText="Cancel">
				<BlogForm />
			</ToggleableComponent>
		)
	};

	return (
		<div className="blogs">
			<div>
				{blogFormToggleRender()}
			</div>
			<div>
				<ul>
					{blogs.map(blog => (
						<li key={blog.id} className="blog">
							<Link to={`/blogs/${blog.id}`} className="blog__header" >{`${blog.title} - ${blog.author}`}</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);

};

const mapStateToProps = state => ({
	blogs: state.blogs.sort((a, b) => b.likes - a.likes),
	user: state.user
});

export default connect(mapStateToProps)(Blogs);