import React, { useEffect, useState } from "react";
import blogService from "./services/blogs";
import BlogComponent from "./components/Blog";
import BlogForm from "./components/newBlogForm";
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

	const loginForm = () => {
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
			<form onSubmit={handleSubmit} >
				<title>Login</title>
				<h3>Login to Blog application</h3>
				<div>username <input type="text" placeholder="For eg. nightwing1998" onChange={handleUsernameChange} value={username} /> </div>
				<div>password <input type="password" onChange={handlePasswordChange} value={password} /> </div>
				<button type="submit">Login</button>
			</form>
		);
	};

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		settlingUser(null);
	};

	const handleNewBlog = async (event) => {
		event.preventDefault();
		try {
			const newBlog = await blogService.createBlog({
				url, title, author
			});
			setBlogs(blogs.concat(newBlog));
			setSuccess("Successfully created new blog!!");
			setTitle("");
			setAuthor("");
			setUrl("");
		} catch (err) {
			createError("Couldn't create blog. Please try again later.");
		}

	};

	return (
		<div className="App">
			{success !== null ? <div className="success">{success}</div> : <></>}
			{error !== null ? <div className="error">{error}</div> : <></>}
			{user === null ? loginForm() :
				<div>
					<h3>Blogs</h3>
					<title>Blog App</title>
					<div>{user["username"]} logged in</div>
					<div><button onClick={handleLogout}>Logout</button></div>
					<div>{<BlogForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} handleSubmit={handleNewBlog} />}</div>
					<div>
						{blogs.length === 0 ?
							<></>
							:
							<div>
								{blogs.map(blog => <BlogComponent blog={blog} key={blog.id} />)}
							</div>
						}
					</div>
				</div>
			}
		</div>
	);
}

export default App;