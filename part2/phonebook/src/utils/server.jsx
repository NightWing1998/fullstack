import axios from 'axios';
const baseUrl = '/api/persons/';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request
			.then(res => res.data)
			.catch(err => {
				console.log(err);
				if (err.response.status === 500) {
					throw new Error("An internal server error has occured");
				}
				else {
					throw new Error(err.message);
				}
			});
}

const create = newPerson => {
	const request = axios.post(baseUrl,newPerson);
	return request
			.then(res => res.data)
			.catch(err => {
				if(err.response.status === 307){
					// THIS INDICATES THAT USER ALREADY EXISTS AND RESPONSE.DATA CONTAINS THE ID OF THAT USER
					let newPersonCopy = {...newPerson};
					newPersonCopy.id = err.response.data.id;
					newPersonCopy.status = 307;
					return newPersonCopy;
				}
				console.log(err);
				if(err.response.status === 404 ){
					throw new Error(err.response.data.error)
				} else if (err.response.status === 500){
					throw new Error("An internal server error has occured");
				} else {
					throw new Error(err.message);
				}
			});
}

const del = (id,name) => {
	const req = axios.delete(baseUrl+id);
	return req
			.then( res => res.data )
			.catch( err => {
				console.log(err);
				if(err.response.status === 404){
					throw new Error(`Cannot delete ${name}. It appears that contact does not exits`)
				} 
				else if(err.response.status === 500){
					throw new Error("An internal server error has occured");
				}
				else {
					throw new Error(err.message);
				}
			} );
}

const updateContact = updtObject => {
	const req = axios.put(baseUrl+updtObject.id,updtObject);
	return req
			.then(res => res.data)
			.catch(err => {
				console.log(err);
				if(err.response.status === 404){
					throw new Error(err.response.data.error);
				} else if (err.response.status === 500) {
					throw new Error("An internal server error has occured");
				}
				else {
					throw new Error(err.message);
				}
			});
}

export default {getAll, create, del, updateContact};