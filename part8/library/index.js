const {
	ApolloServer,
	gql
} = require('apollo-server');
const uuid = require("uuid/v1");

let authors = [{
		name: 'Robert Martin',
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
];

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
 */

let books = [{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'crime']
	},
	{
		title: 'The Demon',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'revolution']
	},
]

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

	type Query {
		hello: String!,
		bookCount : Int!,
		authorCount : Int!,
		allBooks(author : String, genre : String)  : [Book!]!,
		allAuthors: [Author!]!
	}

	type Mutation {
		addBook(
			title : String!,
			author : String!,
			published : Int!,
			genres : [String!]!
		) : Book,
		editAuthor(name : String!, setBornTo : Int!) : Author
	}
`;

const resolvers = {
	Query: {
		hello: () => {
			return "world"
		},
		bookCount: () => {
			return books.length;
		},
		authorCount: () => authors.length,
		allBooks: (root, args) => {
			let all = books;
			if (args.author) {
				all = all.filter(book => book.author === args.author);
			}
			if (args.genre) {
				all = all.filter(book => book.genres.includes(args.genre));
			}
			return all;
		},
		allAuthors: () => authors
	},

	Book: {
		author: root => {
			const author = authors.find(a => a.name === root.author);
			if (!author) {
				return null;
			} else return author;
		}
	},
	Author: {
		bookCount: root => books.filter(b => b.author === root.name).length,
	},
	Mutation: {
		addBook: (root, args) => {
			if (books.find(book => book.title === args.title)) {
				return null;
			}
			const author = args.author;
			if (!authors.find(a => a.name === author)) {
				authors.push({
					name: author,
					id: uuid(),
				});
			}
			const newBook = {
				...args,
				id: uuid()
			};
			books.push(newBook);
			return newBook;
		},
		editAuthor: (root, args) => {
			const oldAuthor = authors.find(a => a.name === args.name);
			if (!oldAuthor) {
				return null;
			}
			const newAuthor = {
				...oldAuthor,
				born: args.setBornTo
			};
			authors = authors.map(a => a.name === args.name ? newAuthor : a);
			return newAuthor;
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({
	url
}) => {
	console.log(`Server ready at ${url}`)
});