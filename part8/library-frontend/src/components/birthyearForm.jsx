import React, { useState } from "react";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";

const EDIT_BIRTHYEAR = gql`
	mutation editAuthorBirthYear($name : String!, $setBornTo : Int!){
		editAuthor(
			name : $name
			setBornTo : $setBornTo
		) {
			name
			id
			born
		}
	}
`;

const BirthYearForm = props => {

	const [author,setAuthor] = useState("");
	const [year,setYear] = useState("");

	const [editAuthor,{loading,error}] = useMutation(EDIT_BIRTHYEAR);

	if(loading){
		return <div>Loading...</div>;
	}

	if(error){
		props.onError(error.message);
		console.error(error);
		return <div>{error.name}</div>;		
	}

	const handleSubmit = e => {
		e.preventDefault();

		editAuthor({variables : {name : author, setBornTo : parseInt(year) }});

		setAuthor("");
		setYear("");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<select name="author" id="author" value={author} onChange={({ target }) => setAuthor(target.value)} >
					{props.authors.map(a => (
						<option value={a.name} key={a.id}>{a.name}</option>
					))}
				</select>
				<input type="number" name="year" id="year" value={year} onChange={({ target }) => setYear(target.value)} />
				<button type="submit">Set year</button>
			</form>
		</div>
	);

};

export default BirthYearForm;