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

	const clearForm = () => {
		setNewName('');
		setNewNumber('');
	}

	useEffect( () => {
		personService
		.getAll()
		.then(response => {
			setPersons(response);
		})
		.catch(err => createError(err.message));
	} , [] );

	const handleSubmit = (e) => {
		e.preventDefault();
		let conclusion = persons.find( ({name}) => name === newName )
		let newPerson = {
			name: newName,
			number: newNumber
		};
		// personService.create(newPerson)
		// 	.then(savedPerson => {
		// 		if(savedPerson.status && savedPerson.status === 400 && savedPerson.id){
		// 			let confirmation = window.confirm(`${newName} already exists in the phonebook. Do you wish to replace the old number?`);
		// 			if (confirmation) {
		// 				newPerson.id = savedPerson.id;
		// 				personService.updateContact(newPerson)
		// 					.then(res => {
		// 						setPersons(persons.filter(p => p.id === res.id ? res : p));
		// 						createSuccess(`Successfully updated ${newName} with ${newNumber}`)
		// 					})
		// 					.catch(err => {
		// 						createError(err.message);
		// 					});
		// 			}
		// 		} else {
		// 			setPersons(persons.concat(savedPerson))
		// 			createSuccess(`Successfully added ${newName} to phonebook`);
		// 		}
		// 	})
		// 	.catch(err => createError(err.message))
		// 	.finally(()=>clearForm());
		if(conclusion !== undefined){
			let confirmation = window.confirm(`${newPerson.name} already exists in the phonebook. Do you wish to replace the old number?`);
			if (confirmation) {
				newPerson.id = conclusion.id;
				personService.updateContact(newPerson)
					.then(savedPerson => {
						setPersons(persons.map(p => p.id === savedPerson.id ? savedPerson : p ));
						createSuccess(`Successfully updated ${newPerson.name} with ${newPerson.number}`)
					})
					.catch(err => {
						createError(err.message);
					})
					.finally(() => clearForm());
			} else {clearForm()}
		} else {
			personService.create(newPerson)
				.then(savedPerson => {
					setPersons(persons.concat(savedPerson))
					createSuccess(`Successfully added ${newPerson.name} to phonebook`);
				})
				.catch(err => createError(err.message))
				.finally(()=>clearForm());
		}
		
	}

	const handleDelete = id => {

		const name = persons.find(p => p.id === id).name;
		let confirmation = window.confirm(`Are you sure you want to delete ${name}`)

		if(confirmation){
			personService.del(id,name)
			.then(res => {
				setPersons( persons.filter(p => p.id !== id) );
				createSuccess(`${name} has been deleted from the phonebook!`);
			})
			.catch( err => setError(err.message) );
		}
	}

	return (
		<>
			<title>Phone-Nook</title>
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
