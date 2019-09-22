import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
	<>
		<h1>{props.course}</h1>
	</>
)

const Part = (props) => (
	<>
		<p>
			{props.part.name} {props.part.exercises}
	 	</p>
	</>
)

const Content = (props) => (
	<>
		{
			props.parts.map( (value,index) => {
				return <Part part={value} key={index} />	
			})
		}
	</>
)

const Total = (props) => {
	let sum = 0;
	props.parts.forEach(element => {
		sum += element.exercises;
	});
	return (
		<>
			<p>
				Number of exercises {sum}
			</p>
		</>
	);
}

const App = () => {
	const course = 'Half Stack application development'
	const parts = [
		{
			name : 'Fundamentals of React',
			exercises : 10
		},
		{
			name : 'Using props to pass data',
			exercises : 7 
		},
		{
			name : 'State of a component',
			exercises : 14 
		}
	]
	return (
		<div>
			<Header course={course} />
			<Content parts = {parts} />
			<Total parts = {parts} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));