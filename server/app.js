const express = require("express");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();

// Body parser, readind data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Allowed app to read cookies from the request
app.use(cookieParser());

// Data Sanitization against XSS
app.use(xss());

// Handling Unhandled Routes - must be the last
app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
