import React from "react";
import PropTypes from "prop-types";

const loginForm = ({ handleSubmit, username, handleUsername, password, handlePassword }) => (
	<div id="login">
		<h2>Login</h2>
		<form onSubmit={handleSubmit}>
			<div>
				Username <input type="text" name="username" id="username" value={username} onChange={handleUsername} />
			</div>
			<div>
				Password <input type="password" name="password" id="password" value={password} onChange={handlePassword} />
			</div>
			<div>
				<button type="submit">Login</button>
			</div>
		</form>
	</div>
)

loginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsername: PropTypes.func.isRequired,
	handlePassword: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default loginForm;