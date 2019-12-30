import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const LOGIN_MUTATUION = gql`
	mutation userLogin($username : String!, $password : String!){
		login(
			username : $username
			password : $password
		) {
			value
		}
	}
`;

const LoginForm = props => {
	const [username,setUsername] = useState("");
	const [password,setPassword] = useState("");

	const [login,{error,loading}] = useMutation(LOGIN_MUTATUION);

	if(!props.show){
		return <></>;
	}

	if(loading){
		return <div>Loading...</div>;
	}
	if(error){
		console.error(error);
		props.onError(error.message,5);
		return <div>{error.name}</div>
	}

	const handleSubmit = async e => {
		e.preventDefault();

		const result = await login({
			variables : {username,password}
		});

		if(result){
			props.setToken(result.data.login.value);
			localStorage.setItem("token",result.data.login.value);
			setUsername("");
			setPassword("");
			props.setPage("authors");
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} >
				<div>
					Username <input type="text" name="username" id="username" value={username} onChange={({ target }) => setUsername(target.value)} />
				</div>
				<div>
					Password <input type="password" name="password" id="password" value={password} onChange={({ target }) => setPassword(target.value)} />
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default LoginForm;