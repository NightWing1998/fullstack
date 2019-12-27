import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
	const [page, setPage] = useState('authors');
	const [error, setError] = useState(null);

	const handleError = (message, secs) => {
		setError(message);
		setTimeout(() => {
			setError(null);
		}, secs * 1000);
	}

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
				<button onClick={() => setPage('add')}>add book</button>
			</div>

			<Authors
				show={page === 'authors'}
				onError={handleError}
			/>

			<Books
				show={page === 'books'}
				onError={handleError}
			/>

			<NewBook
				show={page === 'add'}
				onError={handleError}
			/>

		</div>
	)
}

export default App