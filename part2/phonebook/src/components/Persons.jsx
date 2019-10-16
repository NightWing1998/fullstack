import React from 'react';

const Person = ({name,number}) => (
	<div>
		<em>{name}</em> - {number}
	</div>
)

const Persons = ({persons,filter}) => (
	persons.map(({name,number},index)=>(
		name.includes(filter.toLowerCase())?
			<Person name={name} number={number} key={index} />
		:
			name.includes(filter.toUpperCase())?
				<Person name={name} number={number} key={index} />
			:
				<div key={index} />
	))
)

export default Persons;