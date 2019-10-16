import React from "react";

const Header = (props) => (
	<>
		<h1>{props.name}</h1>
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
	let {parts} = props;
	let initialValue = 0;
	let sum = parts.reduce(
		(accumulator, currentValue) => accumulator + parseInt(currentValue.exercises) 
		, initialValue);

	return (
		<>
			<strong>
				Total of {sum} exercises
			</strong>
		</>
	)
}

const Course = (props) => {

		const {course} = props;
		return (
			<>
				<Header name={course.name} />
				<Content parts={course.parts} />
				<Total parts={course.parts} />
			</>
		)
	}

export default Course;