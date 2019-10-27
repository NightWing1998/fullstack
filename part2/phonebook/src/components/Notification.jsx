import React from 'react';

const Error = ({message}) => {
	if(message === null || message === undefined){
		return <></>
	} else {
		return (
			<div className="error">
				{message}
			</div>
		)
	}
}

const Success = ({message}) => {
	if(message === null || message === undefined){
		return <></>
	} else {
		return (
			<div className="success">
				{message}
			</div>
		)
	}
}

export default {Error, Success};