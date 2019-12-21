import React from "react";

import BlogForm from "./newBlogForm";
import ToggleableComponent from "./ToggleableComponent";

import { Header, Table } from "semantic-ui-react";

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
			<Header as="h1" dividing>Blogs</Header>
			{blogFormToggleRender()}
			<Table striped celled>
				<Table.Body>
					{blogs.map(blog => (
						<Table.Row key={blog.id}>
							<Table.Cell>
								<Link to={`/blogs/${blog.id}`} className="blog__link">
									{blog.title}
								</Link>
							</Table.Cell>
							<Table.Cell>{blog.author}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);

};

const mapStateToProps = state => ({
	blogs: state.blogs.sort((a, b) => b.likes - a.likes),
	user: state.user
});

export default connect(mapStateToProps)(Blogs);