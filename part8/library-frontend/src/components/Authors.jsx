import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo';
import BirthYearForm from "./birthyearForm";

const ALL_AUTHORS = gql`{
	allAuthors {
		name
		id
		born
		bookCount
	}
}`;

const Authors = (props) => {

	const { loading, error, data } = useQuery(ALL_AUTHORS);

	if (!props.show) {
		return null
	}

	if (loading) {
		return <div>Loading.....</div>
	}

	if (error) {
		props.onError(error.message);
		console.error(error);
		return <>{error.name}</>;
	}

	const authors = data.allAuthors;

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>
							born
						</th>
						<th>
							books
						</th>
					</tr>
					{authors.map(a =>
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born || ""}</td>
							<td>{a.bookCount}</td>
						</tr>
					)}
				</tbody>
			</table>
			{props.token ?
				<BirthYearForm authors={authors} onError={props.onError} />
				:
				<></>
			}
		</div>
	)
}

export default Authors