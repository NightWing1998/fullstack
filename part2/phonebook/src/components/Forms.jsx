import React from 'react';

const Filter = ({filter,handleChange}) => (
	<form className="contact">
		<div>
			filter shown with : <input value={filter} onChange={handleChange} />
		</div>
	</form>
)

const NewNumber = ({newName,handleName,newNumber,handleNumber,handleSubmit}) => (
	<form onSubmit={handleSubmit} className="contact">
		<div>
			name: <input value={newName} onChange={ handleName } />
		</div>
		<div>
			number: <input value={newNumber} onChange={ handleNumber } />
		</div>
		<div>
			<button type="submit">Add</button>
		</div>
	</form>
)

export {Filter,NewNumber}