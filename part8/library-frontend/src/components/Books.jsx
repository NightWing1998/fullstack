import React, { useState } from 'react';
import { gql } from 'apollo-boost'
import { useQuery, useApolloClient, useSubscription } from 'react-apollo';

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		author {
			name
			id
		}
		published
		id
	}
`;

const ALL_BOOKS = gql`
	{
		allBooks{
			...BookDetails
		},
		allGenres
	}
	${BOOK_DETAILS}
`;

const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

const FILTERED_BOOKS = gql`
	query fetchBooks($genre : String) {
		allBooks(
			genre : $genre
		){
			...BookDetails
		}
	},
	${BOOK_DETAILS}
`;

const ALL_AUTHORS = gql`{
	allAuthors {
		name
		id
		born
		bookCount
	}
}`;

const Books = (props) => {

	const { loading, error, data } = useQuery(ALL_BOOKS);
	const [filteredBooks, setFilteredBook] = useState(null);
	const client = useApolloClient();
	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			alert("New data arrived");

			const addBook = subscriptionData.data.bookAdded;

			const { allBooks, allGenres } = client.readQuery({ query: ALL_BOOKS });
			// console.log("New book -- ", addBook,"All books ---",allBooks);
			genres.forEach(newGen => {
				if (!allGenres.find(oldGen => oldGen === newGen)) {
					allGenres.push(newGen);
				}
			});

			client.writeQuery({
				query: ALL_BOOKS,
				data: { allBooks: allBooks.concat(addBook), allGenres },
			});
			const { allAuthors } = client.readQuery({ query: ALL_AUTHORS });
			// console.log("All authors --",allAuthors,"current Author ---",addBook.author);
			if (!allAuthors.find(a => a.name === addBook.author.name)) {
				client.writeQuery({
					query: ALL_AUTHORS,
					data: { allAuthors: allAuthors.concat(addBook.author) }
				});
				// console.log("New All authors : ", allAuthors.concat(addBook.author));
			};

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