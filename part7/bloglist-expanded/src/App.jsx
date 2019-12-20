import React, { useEffect } from "react";
import LoginForm from "./components/loginForm";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import Notification from "./components/Notification";

import "./App.css";

import { initialiseBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { logout, cachedUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/usersReducer";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";

const MenuWithoutConnect = props => {
	const style = { padding: 5 };
	const { user, logout } = props;
	return (
		<div className="menu">
			<Link to="/blogs" style={style}>Blogs</Link>
			<Link to="/users" style={style}>Users</Link>
			{user === null ?
				<Link to="/login" style={style}>Login</Link>
				:
				<span style={style}>
					{user["username"]} logged in
					<button onClick={logout}>Logout</button>
				</span>
			}
		</div>
	);
}

const mapStateToProps = state => ({
	user: state.user
});

const Menu = connect(mapStateToProps, { logout })(MenuWithoutConnect);

function App(props) {

	const { user, setNotification, initialiseBlogs, cachedUser, getAllUsers } = props;

	useEffect(() => {
		(async () => {
			if (user) {
				try {
					await initialiseBlogs();
					await getAllUsers();
				} catch (err) {
					setNotification(err, "error", 5);
				}
			} else {
				const userFromStorage = localStorage.getItem("user");
				if (userFromStorage !== null && userFromStorage) {
					cachedUser(userFromStorage);
					try {
						await initialiseBlogs();
						await getAllUsers();
					} catch (err) {
						setNotification(err, "error", 5);
					}
				}
			}
		})();
	}, []);

	return (
		<Router>
			<div className="App">
				<Menu />
				<h3>Blogs</h3>
				<title>Blog App</title>
				<Notification />
				<Route exact path="/login" render={() => <LoginForm />} />
				{user === null ?
					<Redirect to="/login" />
					:
					<div>
						<Route exact path="/" render={() => <Redirect to="/blogs" />} />
						<Route exact path="/users/:id" render={({ match }) => <User id={match.params.id} />} />
						<Route exact path="/users" render={() => <Users />} />
						<Route exact path="/blogs/:id" render={({ match }) => <Blog id={match.params.id} />} />
						<Route exact path="/blogs" render={() => <Blogs />} />
					</div>
				}
			</div>
		</Router>
	);
}

const mapDispatchToProps = {
	initialiseBlogs,
	setNotification,
	cachedUser,
	getAllUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(App);