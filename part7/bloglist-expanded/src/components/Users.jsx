import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Users = props => {
	const { users } = props;

	if (users === null || users === undefined) {
		return <></>;
	}

	return (
		<div className="users">
			<h2>
				Users
				</h2>
			<ul>
				{users.map(user => (
					<li key={user.id}>
						<Link to={`/users/${user.id}`}>{user.name}</Link> - {user.blogs.length}
					</li>
				))}
			</ul>
		</div>
	)

}

const mapStateToProps = state => ({
	users: state.users
});

export default connect(mapStateToProps)(Users);