import React, { useState } from "react";
import { BrowserRouter as Router, withRouter, Route, Link } from "react-router-dom";

const Menu = () => {
	const padding = {
		paddingRight: 5
	};
	return (
		<div>
			<Link to="/" style={padding}>anecdotes</Link>
			<Link to="/create" style={padding}>create new</Link>
			<Link to="/about" style={padding}>about</Link>
		</div>
	);
};

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{anecdotes.map(anecdote => (
				<li key={anecdote.id} >
					<Link to={`/anecdotes/${anecdote.id}`} >{anecdote.content}</Link>
				</li>
			))}
		</ul>
	</div>
);

const Anecdote = ({ anecdote, handleVote }) => (
	<div>
		<div>
			<h2>{anecdote.content} by {anecdote.author}</h2>
		</div>
		<div>
			has {anecdote.votes} <button onClick={() => handleVote(anecdote.id)}>Vote</button>
		</div>
		<div>
			for more information see <a href={anecdote.info}>{anecdote.info}</a>
		</div>
	</div>
);

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>An anecdote is a brief, revealing account of an individual person or an incident.
			Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
			such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
			An anecdote is "a story with a point."</em>

		<p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
	</div>
);

const Footer = () => (
	<div>
		Anecdote app for <a href="https://courses.helsinki.fi/fi/tkt21009">Full Stack -sovelluskehitys</a>.

		See <a href="https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js">https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
	</div>
);

const CreateNewNoHistory = (props) => {
	const [content, setContent] = useState("");
	const [author, setAuthor] = useState("");
	const [info, setInfo] = useState("");


	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNew({
			content,
			author,
			info,
			votes: 0
		});
		props.createNotification(`a new anecdote ${content} created!`, 10);
		props.history.push("/");
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
				</div>
				<div>
					author
					<input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
				</div>
				<div>
					url for more info
					<input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
				</div>
				<button>create</button>
			</form>
		</div>
	);

};

const CreateNew = withRouter(CreateNewNoHistory);

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: "If it hurts, do it more often",
			author: "Jez Humble",
			info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
			votes: 0,
			id: "1"
		},
		{
			content: "Premature optimization is the root of all evil",
			author: "Donald Knuth",
			info: "http://wiki.c2.com/?PrematureOptimization",
			votes: 0,
			id: "2"
		}
	]);

	const [notification, setNotification] = useState("");

	const addNew = (anecdote) => {
		anecdote.id = (Math.random() * 10000).toFixed(0);
		setAnecdotes(anecdotes.concat(anecdote));
	};

	const anecdoteById = (id) =>
		anecdotes.find(a => a.id === id);

	const vote = (id) => {
		const anecdote = anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		};

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
	};

	const createNotification = (message, secs) => {
		setNotification(message);
		setTimeout(() => setNotification(null), secs * 1000);
	};

	return (
		<Router >
			<div>
				<h1>Software anecdotes</h1>
				<Menu />
				{notification !== null ? notification : <></>}
				<Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
				<Route exact path="/create" render={() => <CreateNew addNew={addNew} createNotification={createNotification} />} />
				<Route exact path="/about" render={() => <About />} />
				<Route exact path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={anecdoteById(match.params.id)} handleVote={vote} />} />
				<Footer />
			</div>
		</Router>
	);
};

export default App;