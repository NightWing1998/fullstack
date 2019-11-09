const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./models/Person');
const {
	unknownRoute,
	castError,
	generalError,
	validationError
} = require("./middleware/error");
require('dotenv').config();


const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}, (err) => {
	if (err) console.log(`Cannot connect to db. \n ${err}`);
	else console.log(`Connected to DB!!`);
});

app.use(express.static(__dirname + '/build'));

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

let format = (tokens, req, res) => {
	let response = [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms'
	];
	if (req.body !== undefined) {
		response.push(JSON.stringify(req.body));
	}
	return response.join(' ');
};

app.use(morgan(format));
app.use(cors());

// app.use(morgan('tiny'));
app.get("/api/persons/:id", (req, res, next) => {
	let id = req.params.id;

	Person.findById(id)
		.then(doc => {
			if (doc) {
				res.json(doc.toJSON());
			} else {
				res.status(404).json({
					error: `${id} does not exist`,
					message: `${id} does not exist`
				});
			}
		})
		.catch(err => next(err));

});

app.get("/api/persons", (req, res, next) => {
	Person.find({})
		.then(persons => {
			return res.json(persons.map(person => person.toJSON()));
		})
		// .catch(err => res.status(500).json({
		// 	error: err,
		// 	message: err
		// }));
		.catch(err => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
	let id = req.params.id;
	Person.findByIdAndDelete(id)
		.then(doc => {
			if (doc) {
				res.status(204).end();
			} else {
				res.status(400).json({
					error: `${id} does not exist.`,
					message: `${id} does not exist.`
				});
			}
		})
		.catch(err => next(err));
});

app.post("/api/persons", (req, res, next) => {

	let newPerson = new Person({
		name: req.body.name,
		number: req.body.number
	});
	newPerson.save()
		.then(savedPerson => savedPerson.toJSON())
		.then(savedJSONPerson => res.status(201).json(savedJSONPerson))
		.catch(err => next(err));

});

app.put("/api/persons/:id", (req, res, next) => {
	const id = req.params.id;
	let newDetails = {
		name: req.body.name,
		number: req.body.number
	};

	Person.findByIdAndUpdate(id, newDetails, {
			new: true,
			runValidators: true,
			context: 'query'
		})
		.then(updatedContact => {
			if (updatedContact) {
				res.status(201).json(updatedContact.toJSON());
			} else {
				res.status(400).json({
					error: `${newDetails.name} does not exist in the phonebook`,
					message: `${newDetails.name} does not exist in the phonebook`
				});
			}
		})
		.catch(err => next(err));

});

app.get("/info", (req, res, next) => {
	Person.find({})
		.then(docs => {
			res.status(200).send(`<h2>Phonebook has info for ${docs.length}</h2><div>${new Date().toString()}</div>`);
		})
		.catch(err => next(err));
});

app.use(unknownRoute);
app.use(castError);
app.use(validationError);
app.use(generalError);
app.listen(PORT, err => {
	if (err) console.error(err);
});