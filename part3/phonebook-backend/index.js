const express = require('express');
const app = express();
const morgan = require('morgan');

let Persons = [{
		id : 1,
		name : 'Arto Hellas',
		number : '09-90-9090909'
	},{
		id : 2,
		name : 'Dam Lorenz',
		number : '09-90-0909090'
	},{
		id : 3,
		name : 'Dhruvil',
		number : '91-88-50392965'
	}
];

const PORT = 3001, min = 1, max = parseInt(Math.random()*10000000 || 10000000);

const generateId = () => {
	return parseInt( Math.random()*(max - min + 1) ) + min;
}

app.use(express.json());
app.use(express.urlencoded({extended : true}));

let format= (tokens,req,res)=>{
	let response = [
		tokens.method(req,res),
		tokens.url(req, res),
    	tokens.status(req, res),
    	tokens.res(req, res, 'content-length'), '-',
    	tokens['response-time'](req, res), 'ms'
	];
	if(req.body !== undefined){
		response.push(JSON.stringify(req.body));
	}
	return response.join(' ');
};

app.use(morgan(format));

// app.use(morgan('tiny'));

app.get("/",(req,res) => {
	res.status(200).send('<h1>Hello World</h1>');
})

app.get("/api/persons",(req,res)=>{
	res.status(200).json(Persons);
});

app.get("/api/persons/:id",(req,res)=> {
	let id = parseInt(req.params.id);
	let person = Persons.find(p => p.id === id);
	
	if(person){
		res.status(200).json(person);
	} else {
		res.status(404).json({
			error : `${id} does not exist in the phonebook`
		});
	}
	
})

app.delete("/api/persons/:id",(req,res)=>{
	let id = parseInt(req.params.id);
	let person = Persons.find(p => p.id === id);
	if(person){
		Persons = Persons.filter(p => p.id !== id);
		res.status(204).json(person);
	} else {
		res.status(404).json({
			error : `Couldn't delete contact with ${id}. No such contact exists`
		});
	}
})

app.post("/api/persons",(req,res)=>{
	// console.log(req.body);
	let count = 0;
	if(!req.body.name){
		return res.status(404).json({
			error : `Proprty 'name' is required to create a contact`
		})
	} else if(!req.body.number){
		return res.status(404).json({
			error : `Proprty 'number' is required to create a contact`
		})
	}
	let person = Persons.find(p => p.name === newPerson.name);
	if(person){
		return res.status(404).json({
			error : `Cannot create a new contact with ${newPerson.name}. It already exists in the server`
		});
	}
	let newPerson = {
		name : req.body.name,
		number : req.body.number,
		id : generateId(),
	}
	while(Persons.find(p => p.id === newPerson.id) && count < 3){
		newPerson.id = generateId();
	}
	Persons.push( newPerson );
	res.status(201).json(newPerson);
});

app.put("/api/persons/:id",(req,res)=>{
	const id = parseInt(req.params.id);
	if(!req.body.name){
		return res.status(404).json({
			error : `Proprty 'name' is required to update a contact`
		})
	} else if(!req.body.number){
		return res.status(404).json({
			error : `Proprty 'number' is required to update a contact`
		})
	}
	let newDetails = {
		name : req.body.name,
		number : req.body.number
	}
	const person = Persons.find(p => p.id === id);
	if(person === undefined){
		return res.status(404).json({
			error : `${id} does not exist in the phonebook.`
		})
	}
	newDetails.id = person.id;
	Persons = Persons.map( p => p.id === id?newDetails:p )
	res.status(201).json(newDetails);
})

app.get("/info",(req,res)=>{
	res.status(200).send(`<h2>Phonebook has info for ${Persons.length}</h2><div>${new Date().toString()}</div>`)
});

const unknownRoute = (req,res) => {
	res.status(404).json({
		error : `Route does not exists`
	});
}

app.use(unknownRoute);
app.listen(PORT,err => {if(err) console.error(err)});