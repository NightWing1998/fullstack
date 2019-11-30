import React from "react";

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

export default loginForm;