const unknownRoute = (req, res) => {
	res.status(404).json({
		error: `Route does not exists`
	});
};

const castError = (error, req, res, next) => {
	if (error && error.name === "CastError" && error.kind === 'ObjectId') {
		console.error(error.message);
		return res.status(400).send({
			error: 'malformatted id',
			message: 'malformatted id'
		});
	}
	next(error);
};

const validationError = (error, req, res, next) => {
	if (error && error.name === "ValidationError") {
		console.error(error.message);
		return res.status(400).send({
			error: error.message,
			message: error.message
		});
	}
	next(error);
};

const generalError = (error, req, res) => {
	if (error) {
		console.error(error.message);
		return res.status(500).send({
			error: error
		});
	}
};

module.exports = {
	unknownRoute,
	castError,
	generalError,
	validationError
};