import React from "react";
import PropTypes from "prop-types";

const loginForm = ({ handleSubmit, username, password }) => (
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
)

loginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	username: PropTypes.object.isRequired,
	password: PropTypes.object.isRequired
}

export default loginForm;