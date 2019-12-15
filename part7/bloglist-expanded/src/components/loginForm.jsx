import React from "react";
import { useField } from "../hooks/index";
import { connect } from "react-redux";
import { login } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = props => {

	const { login, setNotification } = props;

	// LOGIN FORM COMPONENTS
	const [username, usernameReset] = useField("text");
	const [password, passwordReset] = useField("password");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await login({ username: username.value, password: password.value });
			setNotification(`Login successfull! Welcome ${username.value}`, "success", 5);
		} catch (err) {
			setNotification("Invalid username or password", "error", 5);
		} finally {
			usernameReset();
			passwordReset();
		}
	};

	return (
		<div id="login">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					Username <input {...username} />
				</div>
				<div>
					Password <input {...password} />
				</div>
				<div>
					<button type="submit">Login</button>
				</div>
			</form>
		</div>
	);
};

const mapDispatchToProps = {
	login, setNotification
};

export default connect(null, mapDispatchToProps)(LoginForm);