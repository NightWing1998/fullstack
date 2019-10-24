import React,{useState, useEffect} from 'react';
import './App.css';
import Persons from './components/Persons';
import {Filter,NewNumber} from './components/Forms';
import axios from 'axios';

const App = () => {
	const [persons,setPersons] = useState([]);

	const [newName,setNewName] = useState('');
	const [newNumber,setNewNumber] = useState('');
	const [filter,setFilter] = useState('');

	useEffect( () => {
		axios
		.get("http://localhost:3001/persons")
		.then( response => {
			// console.log(response.data);
			setPersons(response.data);
		} );
	} , [] );
	
	// console.log("Printing......");
	// console.log("Length of persons : ",persons.length); 

	const handleSubmit = (e) => {
		e.preventDefault();
		let conclusion = true;
		persons.forEach( ({name}) => {
			if(name === newName){
				conclusion = false;
			}
		} );
		conclusion?setPersons( persons.concat({name: newName,number : newNumber}) ):alert(`${newName} already exists in the phonebook`);
		setNewName('');
		setNewNumber('');
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
			<Persons persons={persons} filter={filter} />
		</>
	)
}

export default App;
