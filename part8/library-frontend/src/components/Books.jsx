import React, { useState } from 'react';
import { gql } from 'apollo-boost'
import { useQuery, useApolloClient } from 'react-apollo';

const ALL_BOOKS = gql`{
	allBooks{
		title
		author {
			name
			id
		}
		published
		id
	},
	allGenres
}`;

const FILTERED_BOOKS = gql`
	query fetchBooks($genre : String) {
		allBooks(
			genre : $genre
		){
			title
			author {
				name
				id
			}
			published
			id
		}
	},
`;

const Books = (props) => {

	const { loading, error, data } = useQuery(ALL_BOOKS);
	const [filteredBooks, setFilteredBook] = useState(null);
	const client = useApolloClient();

	if (!props.show) {
		return null
	}

	if (loading) {
		return <div>Loading....</div>;
	}

	if (error) {
		console.error(error);
		props.onError(error.message);
		return;
	}

	const books = filteredBooks !== null ? filteredBooks : data.allBooks;
	const genres = data.allGenres;

	const handleFilter = (genre) => {
		client.query({
			query: FILTERED_BOOKS,
			variables: { genre: genre !== null ? genre : "" }
		})
			.then(res => setFilteredBook(res.data.allBooks))
			.catch(err => props.onError(err.message, 5));
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
							author
						</th>
						<th>
							published
						</th>
					</tr>
					{books.map(a =>
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					)}
				</tbody>
			</table>

			<div>
				{genres.map(genre =>
					<button onClick={() => handleFilter(genre)} key={genre} >{genre}</button>
				)}
				<button onClick={() => setFilteredBook(null)} >all</button>
			</div>

		</div>
	)
}

export default Books