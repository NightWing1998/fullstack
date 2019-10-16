import React from 'react';

const Filter = ({filter,handleChange}) => (
	<form>
		<div>
			filter shown with : <input value={filter} onChange={handleChange} />
		</div>
	</form>
)

const NewNumber = ({newName,handleName,newNumber,handleNumber,handleSubmit}) => (
	<form onSubmit={handleSubmit}>
		<div>
			name: <input value={newName} onChange={ handleName } />
		</div>
		<div>
			number: <input value={newNumber} onChange={ handleNumber } />
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
)

export {Filter,NewNumber}