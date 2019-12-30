import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommendation from './components/Recommendation'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const me = gql`{
	me { 
		username,
		id,
		favoriteGenre
	}
}`;

const App = () => {
	const [page, setPage] = useState('authors');
	const [error, setError] = useState(null);
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const client = useApolloClient();

	const handleError = (message, secs) => {
		setError(message);
		setTimeout(() => {
			setError(null);
		}, secs * 1000);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.clear();
		client.clearStore();
	};

	useEffect(() => {
		const storageToken = localStorage.getItem("token");
		if (storageToken && storageToken !== null) {
			setToken(storageToken);
			client.query({
				query: me
			})
				.then(data => setUser(data.data.me))
				.catch(err => handleError(err.message, 5));
		}
	}, [token]);

	return (
		<div>
			{error !== null ?
				<div style={{ color: "red" }}>{error}</div>
				:
				<></>
			}
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{token ?
					<span>
						<button onClick={() => setPage('add')}>add book</button>
						<button onClick={() => setPage("recommendation")}>recommended</button>
						<button onClick={logout}>Logout</button>
					</span>
					:
					<button onClick={() => setPage('login')}>Login</button>
				}
			</div>

			<Authors
				show={page === 'authors'}
				onError={handleError}
				token={token}
			/>

			<Books
				show={page === 'books'}
				onError={handleError}
			/>

			<NewBook
				show={page === 'add'}
				onError={handleError}
			/>

			<LoginForm
				onError={handleError}
				setToken={setToken}
				show={page === 'login'}
				setPage={setPage}
			/>

			{
				user && user !== null ?
					<Recommendation
						show={page === 'recommendation'}
						genre={user.favoriteGenre}
						onError={handleError}
					/>
					:
					<></>
			}

		</div>
	)
}

export default App