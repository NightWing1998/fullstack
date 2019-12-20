import React from "react";

import CommentForm from "./commentForm";

import { remove as deleteBlog, update as updateBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

import { Card, Header, Comment, Button, Icon, Label } from "semantic-ui-react";

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
		<Card fluid className="blog">
			<Card.Content>
				<Card.Header className="blog__header" >
					{blog.title}
				</Card.Header>
				<Card.Meta > by {blog.author}</Card.Meta>
			</Card.Content>
			<Card.Content className="blog__footer">
				<Card.Description className="blog__url">
					<Header as="h5">
						Link :
						<a href={blog.url} target="_blank" rel="noopener noreferrer">
							{blog.url}
						</a>
					</Header>
				</Card.Description>
				<Button as='div' labelPosition='right' size="mini">
					<Button color='red' onClick={() => updateLike(blog)} size="mini">
						<Icon name='heart' />
						Like
					</Button>
					<Label as='a' basic color='red' pointing='left'>
						{blog.likes}
					</Label>
				</Button>
				<Comment.Group className="blog__comments">
					<Header as='h3' sub dividing>
						Comments
						</Header>
					{blog.comments.map((comment, index) => (
						<Comment key={index}>
							<Comment.Content>
								<Comment.Text>
									{comment}
								</Comment.Text>
							</Comment.Content>
						</Comment>
					))}
					<CommentForm id={blog.id} />
				</Comment.Group>
			</Card.Content>
			<Card.Content extra>
				<Header as="h5" sub>
					added by {blog.user.name}
				</Header>
				{blog.user.id === user.id ?
					<Button icon labelPosition="left" onClick={confirmBeforeDelete} size="mini" color="yellow">
						<Icon name="warning sign" />
						Delete
						</Button>
					:
					<></>
				}
			</Card.Content>
		</Card>
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