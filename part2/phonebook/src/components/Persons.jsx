import React from 'react';

const Person = ({name,number,onClick}) => (
	<div className="contact">
		<em>{name}</em> - {number} <button onClick={onClick}>Delete</button>
	</div>
)

const Persons = ({persons,filter,handleDelete}) => (
	persons.map(({name,number,id}) => {
		let capsName = name.toUpperCase();
		let tempFilter = filter.toUpperCase();
		if(capsName.includes(tempFilter)){
			return <Person name={name} number={number} key={name} onClick={() => handleDelete(id)} />
		} else {
			return <></>
		}
	})
)

export default Persons;