import React, { useState } from "react";
import blogServices from "../services/blogs";

const Blog = ({ blog, createError, createSuccess, userid }) => {

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

	return (
		<div className="blog">
			<ToggleComponenet>
				<div className="blog__header">
					{blog.title} {blog.author} {blog.id}
				</div>
				<div className="blog__footer">
					<div className="blog__url">{blog.url}</div>
					<div className="blog__like">
						{like}
						<button onClick={updateLike}>Like</button>
					</div>
					<div className="blog__owner">
						added by {blog.user.name}
						{/* TODO : COMPLETE THE DELETE BLOG FUNCTIONALITY */}
						{blog.user.id === userid ?
							<button style="color: blue;" onClick={}>
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

export default Blog;