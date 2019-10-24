import React,{useState} from 'react';
import './App.css';
import axios from 'axios';
import Countries from './components/Countries';

const App = () => {
	const [countries, setCountries ] = useState([]);

	const getCountries = (filter) => {
		if(filter.length === 0){
			return;
		} else {
			axios
			.get("https://restcountries.eu/rest/v2/name/" + filter)
			.then(res => {
				setCountries(res.data);
			})
			.catch(e => console.error(e));
		}
	}

	return (
		<div>
			<label htmlFor="country-name">Find countries</label>
			<input type="text" id="country-name" onChange={(e)=>getCountries(e.target.value)} />
			<Countries countries={countries} />
		</div>
	)
}

export default App;