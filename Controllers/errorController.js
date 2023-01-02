const AppError = require("../utils/appError");

function sendErrorDev(err, res) {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
		error: err,
	});
}

function sendErrorProd(err, res) {
	// Operational, trusted error: send a message to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});

		// Programing or other unknown error: we don't want to leak error details
	} else {
		// Send generic message
		res.status(500).json({
			status: "error",
			message: err.message,
		});
	}
}

function handleCastErrorDB(err) {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
}

function handleDuplicateFieldsDB(err) {
	const value = err.keyValue.name;
	const message = `Duplicate field value: ${value} Please use another value`;
	return new AppError(message, 400);
}

function handleValidationErrorDB(err) {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data. ${errors.join(". ")}`;
	return new AppError(message, 400);
}

function handleJWTError(error) {
	return new AppError("Invalid token. Please log in again", 401);
}

function handleExpiredJWTError(error) {
	return new AppError("Expired token. Please log in again", 401);
}

function errorMiddleware(err, req, res, next) {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	console.log(err.name);
	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === "production") {
		let error = { ...err };

		if (error.name === "CastError") error = handleCastErrorDB(error);
		if (error.code === 11000) error = handleDuplicateFieldsDB(error);
		if (error.name === "ValidationError") {
			error = handleValidationErrorDB(error);
		}
		if (error.name === "JsonWebTokenError") error = handleJWTError(error);
		if (error.name === "TokenExpiredError")
			error = handleExpiredJWTError(error);
		sendErrorProd(error, res);
	}
}

module.exports = errorMiddleware;
