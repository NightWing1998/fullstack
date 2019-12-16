import React from "react";
import { connect } from "react-redux";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

const User = ({ name, blogs }) => (
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
		<></>
);

const Users = props => {
	const { users } = props;

	if (users === null || users === undefined) {
		return <></>;
	}

	const MapUsersToLinks = () => (
		<ul>
			{users.map(user => (
				<li key={user.id}>
					<Link to={`/users/${user.id}`}>{user.name}</Link> - {user.blogs.length}
				</li>
			))}
		</ul>
	);

	const mapIdToUser = id => users.find(user => user.id === id);

	return (
		<Router>
			<div className="users">
				<h2>
					Users
				</h2>
				<Route exact path="/users/:id" render={({ match }) => <User {...(mapIdToUser(match.params.id))} />} />
				<Route exact path="/users" render={() => <MapUsersToLinks />} />
				{/* {mapUsersToLinks()} */}
			</div>
		</Router>
	)

}

const mapStateToProps = state => ({
	users: state.users
});

export default connect(mapStateToProps)(Users);