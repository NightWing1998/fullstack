import React,{useState, useEffect} from 'react';
import './App.css';
import Persons from './components/Persons';
import {Filter,NewNumber} from './components/Forms';
import personService from './utils/server';
import Notification from './components/Notification';

const App = () => {
	const [persons,setPersons] = useState([]);

	const [newName,setNewName] = useState('');
	const [newNumber,setNewNumber] = useState('');
	const [filter,setFilter] = useState('');

	const [error,setError] = useState();
	const [success,setSuccess] = useState();

	const createError = err => {
		setError(err);
		setTimeout(() => {
			setError(null);
		},5000);
	}

	const createSuccess = message => {
		setSuccess(message);
		setTimeout(() => {
			setSuccess(null);
		},5000);
	}

	useEffect( () => {
		personService
		.getAll()
		.then(response => {
			setPersons(response);
		})
		.catch( () => createError('Error in fetching contacts from the server. Please try again later!'));
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
			.then( savedPerson => {
				setPersons(persons.concat(savedPerson) )
				createSuccess(`Successfully added ${newName} to phonebook`);
			} )
			.catch( err => createError(`Couldn't add ${newName} to phonebook. Error : ${err}` ) );
		} else {
			let confirmation = window.confirm(`${newName} already exists in the phonebook. Do you wish to replace the old number?`);
			if(confirmation){
				conclusion.number = newNumber;
				personService.updateContact( conclusion )
				.then( res => {
					setPersons( persons.filter(p =>  p.id === res.id?res:p ) );
					createSuccess(`Successfully updated ${newName} with ${newNumber}`)
				} )
				.catch( err => {createError(`${newName} does not exist in the phonebook.`);console.log(err)} );
			}
		};
		setNewName('');
		setNewNumber('');
	}

	const handleDelete = id => {

		const name = persons.find(p => p.id === id).name;
		let confirmation = window.confirm(`Are you sure you want to delete ${name}`)

		if(confirmation){
			personService.del(id)
			.then(res => {
				setPersons( persons.filter(p => p.id !== id) );
				createSuccess(`${name} has been deleted from the phonebook!`);
			})
			.catch( err => setError(`cannot delete ${name}. It appears that contact does not exits`) );
		}
	}

	return (
		<>
			<h1>Phone-Book</h1>
			<Notification.Success message={success} />
			<Notification.Error message={error} />
			<Filter filter={filter} handleChange={(e)=>setFilter(e.target.value)} />
			<h1>Add new</h1>
			<NewNumber 
				handleName={(e) => setNewName(e.target.value)} 
				handleNumber={(e) => setNewNumber(e.target.value)} 
				handleSubmit={handleSubmit}
				newName={newName}
				newNumber={newNumber}
			/>
			<h1>Numbers</h1>
			<Persons persons={persons} filter={filter} handleDelete={handleDelete} />
		</>
	)
}

export default App;
