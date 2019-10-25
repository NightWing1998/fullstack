import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons/';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request
			.then(res => res.data)
			.catch(err => {
				alert(`Error in retriving contacts from server => ${err}`);
			});
}

const create = newPerson => {
	const request = axios.post(baseUrl,newPerson);
	return request
			.then(res => res.data)
			.catch(err => {
				alert(`Error in saving contacts to server => ${err}`);
			});
}

const del = id => {
	const req = axios.delete(baseUrl+id);
	return req
			.then( res => res.data )
			.catch( err => alert(`Error in deleting contact from server => ${err}`) )
}

const updateContact = updtObject => {
	const req = axios.put(baseUrl+updtObject.id,updtObject);
	return req
			.then(res => res.data)
			.catch(err => alert(`Error in updating contact => ${err}`));
}

export default {getAll, create, del, updateContact};