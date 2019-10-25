import React,{useState, useEffect} from 'react';
import './App.css';
import Persons from './components/Persons';
import {Filter,NewNumber} from './components/Forms';
import personService from './utils/server';

const App = () => {
	const [persons,setPersons] = useState([]);

	const [newName,setNewName] = useState('');
	const [newNumber,setNewNumber] = useState('');
	const [filter,setFilter] = useState('');

	useEffect( () => {
		personService
		.getAll()
		.then(response => {
			setPersons(response);
		});
	} , [] );

	const handleSubmit = (e) => {
		e.preventDefault();
		let conclusion = persons.find( ({name}) => name === newName )
		if( conclusion === undefined ){
			let newPerson = {
				name : newName,
				number : newNumber
			};
			personService.create(newPerson)
			.then( savedPerson => setPersons(persons.concat(savedPerson) ) )
		} else {
			let confirmation = window.confirm(`${newName} already exists in the phonebook. Do you wish to replace the old number?`);
			if(confirmation){
				conclusion.number = newNumber;
				personService.updateContact( conclusion )
				.then( res => {
					setPersons( persons.filter(p =>  p.id === res.id?res:p ) );
				} )
				.catch( err => console.error(err) );
			}
		};
		setNewName('');
		setNewNumber('');
	}

	const handleDelete = id => {

		let confirmation = window.confirm(`Are you sure you want to delete ${persons.find(p => p.id === id).name}`)

		if(confirmation){
			personService.del(id)
			.then(res => {
				setPersons( persons.filter(p => p.id !== id) )
			})
			.catch( err => console.log(`cannot delete person with ${id} - Error \n ${err}`));
		}
	}

	return (
		<>
			<h2>Phone-Book</h2>
			<Filter filter={filter} handleChange={(e)=>setFilter(e.target.value)} />
			<h2>Add new</h2>
			<NewNumber 
				handleName={(e) => setNewName(e.target.value)} 
				handleNumber={(e) => setNewNumber(e.target.value)} 
				handleSubmit={handleSubmit}
				newName={newName}
				newNumber={newNumber}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} filter={filter} handleDelete={handleDelete} />
		</>
	)
}

export default App;
