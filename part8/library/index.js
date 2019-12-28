const {
	ApolloServer,
	gql,
	UserInputError
} = require('apollo-server');
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const mongoose = require("mongoose");
const config = require("./utils/config");
const jwt = require('jsonwebtoken');

const {
	JWT_SECRET
} = config;

mongoose.connect(config.MONGODB_URI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true
}, err => {
	if (err) console.error(err)
	else console.log("Connected to DB :", config.MONGODB_URI)
});

const typeDefs = gql `
	type Author {
		name : String!,
		id : ID!,
		born : Int,
		bookCount : Int
	}

	type Book {
		title : String!,
		author : Author!,
		id : ID!,
		genres : [String]!,
		published : Int!
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Query {
		hello: String!,
		bookCount : Int!,
		authorCount : Int!,
		allBooks(author : String, genre : String)  : [Book!]!,
		allAuthors: [Author!]!,
		me : User
	}

	type Mutation {
		addBook(
			title : String!,
			author : String!,
			published : Int!,
			genres : [String!]!
		) : Book,
		editAuthor(name : String!, setBornTo : Int!) : Author,
		createUser(
			username: String!
			favoriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
	}
`;

const resolvers = {
	Query: {
		hello: () => {
			return "world"
		},
		bookCount: async () => {
			return (await Book.find({})).length;
		},
		authorCount: async () => (await Author.find({})).length,
		allBooks: async (root, args) => {
			let parameters = {};
			// if (args.author) {
			// 	parameters.author = args.author;
			// }
			if (args.genre) {
				parameters.genres = {
					$in: args.genre
				};
			}
			return (await Book.find(parameters));
		},
		allAuthors: async () => await Author.find({}),
		me: (root, args, context) => context.currentUser
	},

	Book: {
		author: async root => {
			// const author = authors.find(a => a.name === root.author);
			const author = await Author.findById(root.author);
			if (author === null) {
				return null;
			} else return author;
		},
		id: root => root._id.toString()
	},
	Author: {
		bookCount: async root => (await Book.find({}).populate("author")).filter(book => book.author.name === root.name).length,
		id: root => root._id.toString()
	},
	User: {
		favoriteGenre: root => root.favoriteGenre || root.favouriteGenre
	},
	Mutation: {
		addBook: async (root, args, context) => {

			if (context.currentUser === null) {
				throw new UserInputError("User not logged in", {
					invalidUser: "No user token was found"
				});
			}

			const findBook = await Book.findOne({
				title: args.title
			});
			if (findBook !== null) {
				return null;
			}

			const authorName = args.author;
			let author = await Author.findOne({
				name: authorName
			});
			try {
				if (author === null) {
					author = await (new Author({
						name: authorName
					})).save();
				}

				const newBook = new Book({
					...args,
					author: author._id
				});

				return (await newBook.save());
			} catch (err) {
				throw new UserInputError(err.message, {
					invalidArgs: args,
				})
			}

		},
		editAuthor: async (root, args, context) => {

			if (context.currentUser === null) {
				throw new UserInputError("User not logged in", {
					invalidUser: "No user token was found"
				});
			}

			const oldAuthor = await Author.findOne({
				name: args.name
			});

			if (!oldAuthor) {
				return null;
			}

			oldAuthor.born = args.setBornTo;
			return oldAuthor.save();

		},
		createUser: (root, args, context) => {

			if (context.currentUser !== null) {
				return null;
			}

			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre
			})

			return user.save()
				.catch(error => {
					throw new UserInputError(error.message, {
						invalidArgs: args,
					})
				})
		},
		login: async (root, args, context) => {

			if (context.currentUser !== null) {
				throw new UserInputError("User already logged in", {
					invalidUser: "User token was found"
				});
			}

			const user = await User.findOne({
				username: args.username
			})

			if (!user || args.password !== 'password') {
				throw new UserInputError("username and password invalid");
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return {
				value: jwt.sign(userForToken, JWT_SECRET)
			}
		},
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({
		req
	}) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(
				auth.substring(7), JWT_SECRET
			);
			const currentUser = await User.findById(decodedToken.id);
			return {
				currentUser
			}
		} else return {
			currentUser: null
		}
	}
});

server.listen().then(({
	url
}) => {
	console.log(`Server ready at ${url}`);
	// User.deleteMany({}).then(res => console.log("deleted all users.", res));
});