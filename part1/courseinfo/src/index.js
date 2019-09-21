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
			{props.part} {props.exercises}
	 	</p>
	</>
)

const Total = (props) => {
	let sum = 0;
	props.exercises.forEach(element => {
		sum += element;
	});
	return (<>
		<p>
			Number of exercises {sum}
		</p>
	</>)
}

const App = () => {
	const course = 'Half Stack application development'
	const part = ['Fundamentals of React','Using props to pass data','State of a component'];
	const exercises = [10,7,14];
	return (
		<div>
			<Header course={course} />
			{part.map((value,index) => {
				return <Part part={value} exercises={exercises[index]} key={index} />
			} )}
			<Total 
				exercises = {exercises} 
			/>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));