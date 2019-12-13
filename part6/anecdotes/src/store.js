import {
	combineReducers,
	createStore,
	applyMiddleware
} from "redux";
import {
	composeWithDevTools
} from "redux-devtools-extension";
import thunk from "redux-thunk";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	notification: notificationReducer,
	filter: filterReducer
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;