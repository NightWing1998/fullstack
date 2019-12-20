import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header } from "semantic-ui-react";

const Users = props => {
	const { users } = props;

	if (users === null || users === undefined) {
		return <></>;
	}

	return (
		<div className="users">
			<Header as="h1" dividing>
				Users
			</Header>
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