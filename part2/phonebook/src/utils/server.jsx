import axios from 'axios';
const baseUrl = '/api/persons/';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request
			.then(res => res.data)
			.catch(err => {
				console.log(err, err.response);
				if (err.response.status === 500) {
					throw new Error("An internal server error has occured");
				} else {
					throw new Error(err.message || err.response.data.error);
				}
			});
}

const create = newPerson => {
	const request = axios.post(baseUrl,newPerson);
	return request
			.then(res => res.data)
			.catch(err => {
				console.log(err);
				if(err.response.status === 400){
					// THIS INDICATES THAT USER ALREADY EXISTS AND RESPONSE.DATA CONTAINS THE ID OF THAT USER
					if (err.response.data.error && !err.response.data.id){
						throw new Error(err.response.data.error)
					}
					let newPersonCopy = {...newPerson};
					newPersonCopy.id = err.response.data.id;
					newPersonCopy.status = 400;
					return newPersonCopy;
				}
				if (err.response.status === 500){
					throw new Error("An internal server error has occured");
				} else {
					throw new Error(err.message || err.response.data.error);
				}
			});
}

const del = (id,name) => {
	const req = axios.delete(baseUrl+id);
	return req
			.then( res => res.data )
			.catch( err => {
				console.log(err,err.response);
				if(err.response.status === 400){
					throw new Error(`Cannot delete ${name} ${err.response.data.error}`)
				} else if(err.response.status === 500){
					throw new Error("An internal server error has occured");
				} else {
					throw new Error(err.message || err.response.data.error);
				}
			} );
}

const updateContact = updtObject => {
	const req = axios.put(baseUrl+updtObject.id,updtObject);
	return req
			.then(res => res.data)
			.catch(err => {
				console.log(err, err.response);
				if(err.response.status === 400){
					throw new Error(`Cannot update ${updtObject.name} ${err.response.data.error}`);
				} else if (err.response.status === 500) {
					throw new Error("An internal server error has occured");
				}
				else {
					throw new Error(err.message || err.response.data.error);
				}
			});
}

export default {getAll, create, del, updateContact};