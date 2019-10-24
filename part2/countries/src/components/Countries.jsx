import React,{ useState, useEffect } from 'react';
import axios from 'axios';

const Country = (props) => {
	// console.log(props.country);
	const country = props.country;
	const [weather,setWeather] = useState({});
	const apiKey = "c8e5de18ef92397d8263e9476ab6c11a";
	useEffect( () => {
		let config = {
			params : {
				"access_key" : apiKey,
				"query" : country.capital
			}
		}
		axios
		.get("http://api.weatherstack.com/current",config)
		.then(res => {
			setWeather(res.data);
		})
	},[country] );

	return (
		<div>
			<h1>{country.name}</h1>
			<div>capital - {country.capital}</div>
			<div>population - {country.population}</div>
			<h3>languages</h3>
			{country.languages.map( lang => <div key={lang.name}>{lang.name}</div> )}
			<img src={country.flag} alt="flag"/>
			<h3>Weather in {country.capital}</h3>
			{weather.current?
				<>
					<div>temperature : {weather.current.temperature} Celsius</div>
					<div>wind : {weather.current["wind_speed"]} kmph direction {weather.current["wind_dir"]}</div>
				</>
			:
				<></>
			}
		</div>
	)
}

const Countries = (props) => {
	const countries = props.countries;
	const [button, changeButton] = useState(false);
	const [currentCountry, setCountry] = useState(countries[0]);

	const handleClick = (e) => {
		console.log(e.target.value);
		setCountry(countries[e.target.value]);
		changeButton(!button);
	}

	return (
		<div>
			{
				(countries.length === 1 || button)?
				<Country country={currentCountry || countries[0]} />
				:
				(countries.length < 10)?
				<div>
					{countries.map( (country,index) => (
						<div key={country.name}>
						{country.name}
						<button onClick={handleClick} value={index}>show</button>
						</div>
					) )}
				</div>
				:
				<div>
					Too many matches, specify another filter
				</div>
			}
		</div>
	)
}

export default Countries;