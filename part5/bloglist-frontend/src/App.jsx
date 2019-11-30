import React, { useEffect, useState } from "react";
import blogService from "./services/blogs";
import BlogComponent from "./components/Blog";
import ToggleableComponent from "./components/ToggleableComponent";
import BlogForm from "./components/newBlogForm";
import LoginForm from "./components/loginForm";
import loginServices from "./services/userServices";
import "./App.css";

function App() {

	const [blogs, setBlogs] = useState([]);
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const createSuccess = (message) => {
		setSuccess(message.toString());
		setTimeout(() => {
			setSuccess(null);
		}, 5000);
	};

	const createError = (message) => {
		setError(message.toString());
		setTimeout(() => {
			setError(null);
		}, 5000);
	};

	const settlingUser = (userData) => {
		if (userData !== null) {
			blogService.setToken(userData.token);
		} else {
			blogService.setToken(null);
		}
		setUser(userData);
	};

	useEffect(() => {
		(async () => {
			try {
				const blogsInServer = await blogService.getAll();
				setBlogs(blogsInServer);
			} catch (err) {
				createError(err);
			}
		})();
	}, []);

	useEffect(() => {
		const userFromStorage = localStorage.getItem("user");
		if (userFromStorage !== null || userFromStorage) {
			settlingUser(JSON.parse(userFromStorage));
		}
	}, []);

	const loginFormToggleRender = () => {
		const handleUsernameChange = ({ target }) => setUsername(target.value);
		const handlePasswordChange = ({ target }) => setPassword(target.value);
		const handleSubmit = async (event) => {
			event.preventDefault();
			try {
				const userData = await loginServices.login({ username, password });
				settlingUser(userData);
				localStorage.setItem("user", JSON.stringify(userData));
				createSuccess("Login successfull!!");
			} catch (err) {
				createError("Invalid username or password");
			} finally {
				setUsername("");
				setPassword("");
			}
		};
		return (
			<ToggleableComponent clickToShowText="Login" clickToHideText="Cancel">
				<LoginForm
					username={username}
					handleUsername={handleUsernameChange}
					handlePassword={handlePasswordChange}
					password={password}
					handleSubmit={handleSubmit}
				/>
			</ToggleableComponent>
		)
	};

	const blogFormRef = React.createRef();

	const blogFormToggleRender = () => {
		const handleNewBlog = async (event) => {
			event.preventDefault();
			try {
				blogFormRef.current.toggleVisibility();
				const newBlog = await blogService.createBlog({
					url, title, author
				});
				setBlogs(blogs.concat(newBlog));
				setSuccess("Successfully created new blog!!");
				setTitle("");
				setAuthor("");
				setUrl("");
				// blogFormRef.current.toggleVisibility();
			} catch (err) {
				console.log(err);
				createError("Couldn't create blog. Please try again later.");
			}

		};
		return (
			<ToggleableComponent ref={blogFormRef} clickToShowText="Create New Blog" clickToHideText="Cancel">
				<BlogForm
					title={title}
					setTitle={setTitle}
					author={author}
					setAuthor={setAuthor}
					url={url}
					setUrl={setUrl}
					handleSubmit={handleNewBlog}
				/>
			</ToggleableComponent>
		)
	}

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		settlingUser(null);
	};

	return (
		<div className="App">
			<h3>Blogs</h3>
			<title>Blog App</title>
			{success !== null ? <div className="success">{success}</div> : <></>}
			{error !== null ? <div className="error">{error}</div> : <></>}
			{user === null ?
				loginFormToggleRender()
				:
				<>
					<div>{user["username"]} logged in</div>
					<div><button onClick={handleLogout}>Logout</button></div>
					{blogFormToggleRender()}
				</>
			}
			<div>
				{blogs.length === 0 ?
					<></>
					:
					<div>
						{blogs.map(blog => <BlogComponent blog={blog} key={blog.id} createError={createError} createSuccess={createSuccess} userid={user.id} />)}
					</div>
				}
			</div>
		</div>
	);
}

export default App;