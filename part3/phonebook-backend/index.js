const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./models/Person');
const {
	unknownRoute,
	castError,
	generalError
} = require("./middleware/error");
require('dotenv').config();


const PORT = process.env.PORT || 3001,
	min = 1,
	max = parseInt(Math.random() * 10000000 || 10000000);

const generateId = () => {
	return parseInt(Math.random() * (max - min + 1)) + min;
};

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}, (err) => {
	if (err) console.log(`Cannot connect to db. \n ${err}`);
	else console.log(`Connected to DB!!`);
})

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

app.get("/api/persons/:id", (req, res, next) => {
	let id = req.params.id;

	Person.findById(id)
		.then(doc => {
			if (doc) {
				res.json(doc.toJSON())
			} else {
				res.status(404).json({
					error: `${id} does not exist`,
					message: `${id} does not exist`
				})
			}
		})
		.catch(err => next(err))

})

app.delete("/api/persons/:id", (req, res, next) => {
	let id = req.params.id;
	Person.findByIdAndDelete(id)
		.then(doc => {
			if (doc) {
				res.status(204).end();
			} else {
				res.status(404).json({
					error: `${id} does not exist.`,
					message: `${id} does not exist.`
				})
			}
		})
		.catch(err => next(err))
})

app.post("/api/persons", (req, res, next) => {
	// console.log(req.body);
	let count = 0;
	if (!req.body.name) {
		return res.status(404).json({
			error: `Property 'name' is required to create a contact`
		})
	} else if (!req.body.number) {
		return res.status(404).json({
			error: `Property 'number' is required to create a contact`
		})
	}

	Person.findOne({
			name: req.body.name
		})
		.then(doc => {
			if (doc) {
				// res.setHeader('location', '/api/persons/' + doc._id);
				res.status(307).json({
					id: doc._id
				});
				return;
			} else {
				return new Person({
					name: req.body.name,
					number: req.body.number
				})
			}
		})
		.then(newPerson => {
			if (!newPerson) {
				return;
			}
			newPerson.save()
				.then(savedPerson => res.status(201).json(savedPerson.toJSON()))
				.catch(err => {
					throw err
				});
		})
		.catch(err => next(err))
});

app.put("/api/persons/:id", (req, res, next) => {
	const id = req.params.id;
	if (!req.body.name) {
		return res.status(404).json({
			error: `Property 'name' is required to update a contact`
		})
	} else if (!req.body.number) {
		return res.status(404).json({
			error: `Property 'number' is required to update a contact`
		})
	}
	let newDetails = {
		name: req.body.name,
		number: req.body.number
	}

	Person.findByIdAndUpdate(id, newDetails, {
			new: true
		})
		.then(updatedContact => {
			if (updatedContact) {
				res.status(201).json(updatedContact.toJSON());
			} else {
				res.status(404).json({
					error: `${newDetails.name} does not exist in the phonebook`,
					message: `${newDetails.name} does not exist in the phonebook`
				})
			}
		})
		.catch(err => next(err))

})

app.get("/info", (req, res, next) => {
	Person.find({})
		.then(docs => {
			res.status(200).send(`<h2>Phonebook has info for ${docs.length}</h2><div>${new Date().toString()}</div>`)
		})
		.catch(err => next(err))
});

app.use(unknownRoute);
app.use(castError);
app.use(generalError);
app.listen(PORT, err => {
	if (err) console.error(err)
});