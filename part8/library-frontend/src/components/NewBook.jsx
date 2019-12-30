import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';

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

const NEW_BOOK = gql`
	mutation newBook($title: String!, $author : String!, $published : Int!, $genres : [String!]! ){
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;

const ALL_BOOKS = gql`
{
	allBooks{
		...BookDetails
	},
	allGenres
}
	${BOOK_DETAILS}`;

const ALL_AUTHORS = gql`{
	allAuthors {
		name
		id
		born
		bookCount
	}
}`;

const NewBook = (props) => {
	const [title, setTitle] = useState('')
	const [author, setAuhtor] = useState('')
	const [published, setPublished] = useState('')
	const [genre, setGenre] = useState('')
	const [genres, setGenres] = useState([])

	const [createBook, { loading, error }] = useMutation(NEW_BOOK, {
		update(cache, { data: { addBook } }) {
			const { allBooks, allGenres } = cache.readQuery({ query: ALL_BOOKS });
			// console.log("New book -- ", addBook,"All books ---",allBooks);
			genres.forEach(newGen => {
				if (!allGenres.find(oldGen => oldGen === newGen)) {
					allGenres.push(newGen);
				}
			});
			cache.writeQuery({
				query: ALL_BOOKS,
				data: { allBooks: allBooks.concat(addBook), allGenres },
			});
			const { allAuthors } = cache.readQuery({ query: ALL_AUTHORS });
			// console.log("All authors --",allAuthors,"current Author ---",addBook.author);
			if (!allAuthors.find(a => a.name === addBook.author.name)) {
				cache.writeQuery({
					query: ALL_AUTHORS,
					data: { allAuthors: allAuthors.concat(addBook.author) }
				});
				// console.log("New All authors : ", allAuthors.concat(addBook.author));
			};
		}
	});

	if (!props.show) {
		return null
	};

	if (loading) {
		return <div>Loading...</div>;
	};

	if (error) {
		props.onError(error.message);
		console.error(error);
		return <>{error.name}</>;
	}

	const submit = async (e) => {
		e.preventDefault()

		createBook({
			variables: {
				title, author, published: parseInt(published), genres
			}
		});

		setTitle('')
		setPublished('')
		setAuhtor('')
		setGenres([])
		setGenre('')
	}

	const addGenre = () => {
		setGenres(genres.concat(genre))
		setGenre('');
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuhtor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type='number'
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">add genre</button>
				</div>
				<div>
					genres: {genres.join(' ')}
				</div>
				<button type='submit'>create book</button>
			</form>
		</div>
	)
}

export default NewBook