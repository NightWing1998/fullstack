import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_ANECDOTE":
			return [...state, action.data];
		case "VOTE_ANECDOTE":
			let id = action.data.id;
			let oldAnecdote = state.find(a => a.id === id);
			let changedAnecdote = {
				...oldAnecdote,
				votes: oldAnecdote.votes + 1
			};
			return state.map(a => a.id === id ? changedAnecdote : a);
		case "INIT_ANECDOTES":
			return action.data;
		default:
			return state;
	}
};

export default reducer;

/**
 * 
 * @param {String} content 
 */
export const createAnecdote = content => (
	async dispatch => {
		const anecdote = await anecdoteService.createAnecdote(content);
		dispatch({
			type: "NEW_ANECDOTE",
			data: anecdote
		})
	}
);

/**
 * 
 * @param {Number} id 
 */
export const voteForAnecdote = id => (
	async dispatch => {
		let oldAnecdote = await anecdoteService.getAnecdoteById(id);
		let changedAnecdote = {
			...oldAnecdote,
			votes: oldAnecdote.votes + 1
		};
		await anecdoteService.updateAnecdote(id, changedAnecdote);
		dispatch({
			type: "VOTE_ANECDOTE",
			data: {
				id
			}
		});
	}
);

export const initalizeAnecdotes = () => (
	async dispatch => {
		const anecdotes = await anecdoteService.getAllAnecdotes();
		dispatch({
			type: "INIT_ANECDOTES",
			data: anecdotes
		});
	}
);