const mongoose = require('mongoose');
require('dotenv').config();


const personSchema = new mongoose.Schema({
	name: String,
	number: String
}).set('toJSON', {
	transform: (doc, returnObject) => {
		returnObject.id = returnObject._id.toString()
		delete returnObject._id
		delete returnObject.__v
	}
});

const Person = mongoose.model('Person', personSchema);

mongoose.connect(process.env.DB_URI, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}, (err) => {
	if (err) console.error(`${err} in connecting to DB!!`);
	else console.log(`Connected to DB`);

	if (process.argv.length === 2) {
		Person.find({})
			.then(res => {
				// console.log(res);
				console.log(`Phonebook`);
				res.forEach(person => {
					let pJSON = person.toJSON();
					console.log(`${pJSON["name"]} ${pJSON["number"]}`);
				})
				mongoose.disconnect();
			})
			.catch(err => {
				console.error(err);
				mongoose.disconnect();
			});
	} else if (process.argv.length >= 2) {
		let name = process.argv[3];
		let number = process.argv[4];

		Person.findOne({
				name
			})
			.then(res => {
				if (res) {
					console.log(`Name already exists cannot create new contact!`);
					mongoose.disconnect();
				} else {
					let newPerson = new Person({
						name,
						number
					});
					newPerson.save()
						.then(createdPerson => {
							console.log(`added ${name} number ${number} to phonebook`);
							mongoose.disconnect();
						})
				}
			})
			.catch(err => {
				console.error(err);
				mongoose.disconnect();
			});

	}

});