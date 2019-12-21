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

import { Container, Menu as Navbar, Button } from 'semantic-ui-react';
import { useState } from "react";

const MenuWithoutConnect = props => {
	const { user, logout } = props;
	const [activePage, setPage] = useState("blogs");
	return (
		<Navbar className="menu" stackable pointing>
			<Navbar.Item active={activePage === "blogs"} >
				<Link onClick={() => setPage("blogs")} to="/blogs" style={{ color: "inherit" }} >Blogs</Link>
			</Navbar.Item>
			<Navbar.Item active={activePage === "users"} >
				<Link onClick={() => setPage("users")} to="/users" style={{ color: "inherit" }}>Users</Link>
			</Navbar.Item>
			{user === null ?
				<Navbar.Item active={activePage === "login"} >
					<Link onClick={() => setPage("login")} to="/login" style={{ color: "inherit" }} >Login</Link>
				</Navbar.Item>
				:
				<>
					<Navbar.Item name={user["username"]} position="right">
					</Navbar.Item>
					<Navbar.Item link onClick={logout} >
						<Button>Logout</Button>
					</Navbar.Item>
				</>
			}
		</Navbar>
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
					// setNotification("Fetch successfull", "success", 5);
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
	});

	return (
		<Router>
			<Container className="App">
				<Menu />
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
			</Container>
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