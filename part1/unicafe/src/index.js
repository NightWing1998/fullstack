import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => (
	<button onClick={props.onClick}>{props.text || ""}</button>
)

const Statistics = (props) => {
	const {good, neutral, bad} = props;
	return (
		<>
			{
				good || bad || neutral ? 
				<>
					<p>statistics</p>
					<table>
						<Statistic value={good} text="good" />
						<Statistic value={neutral} text="neutral" />
						<Statistic value={bad} text="bad" />
						<Statistic value={good + neutral + bad} text="all" />
						<Statistic value={(good - bad)/(good+bad+neutral)} text="average" />
						<Statistic value={((good/(good+bad+neutral))*100).toString()+"%"} text="positive" />
					</table>
				</>
				:
				<>
					No feedback given
				</>
			}
		</>
	)
}

const Statistic = (props) => (
	<tbody>
		<tr>
			<td>{props.text}</td>
			<td>{props.value}</td>
		</tr>
	</tbody>
)

const App = () => {
	
	const [ good, setGood ] = useState(0);
	const [ neutral, setNeutral ] = useState(0);
	const [ bad, setBad ] = useState(0);

	const handleClick = (feedback) => {
		if(feedback === "good"){
			return () => setGood(good + 1);
		}
		else if(feedback === "neutral"){
			return () => setNeutral(neutral + 1);
		}
		if(feedback === "bad"){
			return () => setBad(bad + 1);
		}
	}

	return (
		<>
			<div>
				Give feedback
			</div>
			<div>
				<Button text="good" onClick={handleClick("good")} />
				<Button text="neutral" onClick={handleClick("neutral")} />
				<Button text="bad" onClick={handleClick("bad")} />
			</div>
			<div>
				<Statistics good={good} neutral={neutral} bad={bad} />
			</div>
		</>
	)
};

ReactDOM.render(<App />, document.getElementById('root'));