import React, { useEffect } from "react";
import ToggleableComponent from "./components/ToggleableComponent";
import BlogForm from "./components/newBlogForm";
import LoginForm from "./components/loginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";

import "./App.css";

import { initialiseBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { logout, cachedUser } from "./reducers/userReducer";

import { connect } from "react-redux";

function App(props) {



	const { user, setNotification, initialiseBlogs, logout, cachedUser } = props;

	useEffect(() => {
		(async () => {
			const userFromStorage = localStorage.getItem("user");
			if (userFromStorage !== null && userFromStorage) {
				cachedUser(userFromStorage);
				try {
					await initialiseBlogs();
				} catch (err) {
					setNotification(err, "error", 5);
				}
			}
		})();
	}, []);

	const loginFormToggleRender = () => {
		return (
			<ToggleableComponent clickToShowText="Login" clickToHideText="Cancel">
				<LoginForm />
			</ToggleableComponent>
		)
	};

	const blogFormToggleRender = () => {
		return (
			<ToggleableComponent clickToShowText="Create New Blog" clickToHideText="Cancel">
				<BlogForm />
			</ToggleableComponent>
		)
	}

	return (
		<div className="App">
			<h3>Blogs</h3>
			<title>Blog App</title>
			<Notification />
			{user === null ?
				loginFormToggleRender()
				:
				<div>
					<div className="userspace">{user["username"]} logged in</div>
					<div><button onClick={logout}>Logout</button></div>
					{blogFormToggleRender()}
					<Blogs />
				</div>
			}
		</div>
	);
}

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = {
	initialiseBlogs,
	setNotification,
	logout,
	cachedUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);