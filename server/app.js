const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const errorMiddleware = require("./controllers/errorController");
const AppError = require("./utils/appError");
const userRouter = require("./Routes/userRoutes");
const productsRouter = require("./Routes/productsRoutes");
const app = express();

// Body parser, readind data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Development loggin
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Set security HTTP headers
app.use(helmet());

// Limit requests from the same IP
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

// Allowed app to read cookies from the request
app.use(cookieParser());

// Data Sanitization against XSS
app.use(xss());

// Implament Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);

// Handling Unhandled Routes - must be the last
app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
