import React from "react";
import { useField } from "../hooks/index";
import { connect } from "react-redux";
import { login } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { withRouter } from "react-router-dom";
import { Header } from "semantic-ui-react";

const LoginForm = props => {

	const { login, setNotification, user } = props;

	// LOGIN FORM COMPONENTS
	const [username, usernameReset] = useField("text");
	const [password, passwordReset] = useField("password");

	if (user) {
		props.history.push("/");
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await login({ username: username.value, password: password.value });
			setNotification(`Login successfull! Welcome ${username.value}`, "success", 5);
			props.history.push("/");
		} catch (err) {
			setNotification("Invalid username or password", "error", 5);
		} finally {
			usernameReset();
			passwordReset();
		}
	};

	return (
		<div id="login">
			<Header sub>Login</Header>
			<form onSubmit={handleSubmit}>
				<div>
					Username <input {...username} id="username" />
				</div>
				<div>
					Password <input {...password} id="password" />
				</div>
				<div>
					<button type="submit">Log in</button>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = state => ({
	user: state.user,
});

const mapDispatchToProps = {
	login, setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));