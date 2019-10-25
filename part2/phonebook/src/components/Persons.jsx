import React from 'react';

const Person = ({name,number,onClick}) => (
	<div>
		<em>{name}</em> - {number} <button onClick={onClick}>Delete</button>
	</div>
)

const Persons = ({persons,filter,handleDelete}) => (
	persons.map(({name,number,id})=>(
		name.includes(filter.toLowerCase())?
			<Person name={name} number={number} key={name} onClick={() => handleDelete(id)} />
		:
			name.includes(filter.toUpperCase())?
				<Person name={name} number={number} key={name} onClick={handleDelete} />
			:
				<div key={name} />
	))
)

export default Persons;