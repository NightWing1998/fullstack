const logger = require("./logger");

const requestLogger = (request, response, next) => {
	logger.info("Host: ", request.headers["x-forwarded-host"] || request.hostname, "Remote Address: ", request.headers["x-forwarded-for"] || request.connection.remoteAddress, "Method: ", request.method, " Path:  ", request.path, "Body:  ", request.body, "Token:", JSON.stringify(request.get("authorization")));
	logger.info("---");
	next();
};

const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		request.token = authorization.substring(7);
		request.isAuthenticated = true;
	} else {
		request.isAuthenticated = false;
	}
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({
		error: "unknown endpoint"
	});
};

const errorHandler = (error, request, response, next) => {
	logger.error("@@@", error);

	if (error.name === "CastError" && error.kind === "ObjectId") {
		return response.status(400).send({
			error: "malformatted id"
		});
	} else if (error.name === "ValidationError") {
		return response.status(400).json({
			error: error._message || error.message
		});
	} else if (error.name === "MongoError") {
		return response.status(500).json({
			error: error._message || error.message
		})
	} else if (error.name === "JsonWebTokenError") {
		return response.status(401).json({
			error: "invalid JWT token"
		});
	}

	next(error);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor
};