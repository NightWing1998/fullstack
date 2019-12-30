import React from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo';

const ALL_BOOKS = gql`
	query fetchBooks($genre : String!) {
		recommendation : allBooks(
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

const Recommendation = (props) => {

	const { loading, error, data } = useQuery(ALL_BOOKS, {
		variables: {
			genre: props.genre
		}
	});

	if (!props.show) {
		return null
	}

	if (loading) {
		return <div>Loading....</div>;
	}

	if (error) {
		console.error(error);
		props.onError(error.message);
		return <>{error.name}</>;
	}

	const books = data.recommendation;

	return (
		<div>
			<h2>Recommendation</h2>

			<p>books in your favorite genre : {props.genre}</p>

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

		</div>
	)
}

export default Recommendation;