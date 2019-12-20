import React from "react";

import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

const User = props => {
	const { user } = props;

	const { name, blogs } = user;

	return (
		name ?
			<div>
				<h2>{name}</h2>
				<strong>added blogs</strong>
				<ul>
					{blogs.map(blog => (
						<li key={blog.id}>
							{blog.title}
						</li>
					))}
				</ul>
			</div>
			:
			<>
				<Redirect to="/users" />
			</>
	);
}


const mapStateToProps = (state, ownProps) => ({
	user: state.users.find(user => user.id === ownProps.id)
});

export default connect(mapStateToProps)(User);