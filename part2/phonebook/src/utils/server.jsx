import axios from 'axios';
const baseUrl = '/api/persons/';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request
			.then(res => res.data)
			.catch(err => {throw err});
}

const create = newPerson => {
	const request = axios.post(baseUrl,newPerson);
	return request
			.then(res => res.data)
			.catch(err => {throw err});
}

const del = id => {
	const req = axios.delete(baseUrl+id);
	return req
			.then( res => res.data )
			.catch( err => {throw err} );
}

const updateContact = updtObject => {
	const req = axios.put(baseUrl+updtObject.id,updtObject);
	return req
			.then(res => res.data)
			.catch(err => {throw err});
}

export default {getAll, create, del, updateContact};