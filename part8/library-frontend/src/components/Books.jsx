import React from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo';

const ALL_BOOKS = gql`{
	allBooks {
		title
		author {
			name
			id
		}
		published
		id
	}
}`;

const Books = (props) => {

	const {loading,error,data} = useQuery(ALL_BOOKS);

	if (!props.show) {
		return null
	}

	if(loading){
		return <div>Loading....</div>;
	}

	if(error){
		console.error(error);
		props.onError(error.message);
		return;
	}

	const books = data.allBooks;

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
		</div>
	)
}

export default Books