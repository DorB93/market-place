const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const productsController = require("./Controllers/productsController");
const errorMiddleware = require("./controllers/errorController");
const AppError = require("./utils/appError");
const reviewRouter = require("./Routes/reviewsRoutes");
const orderRouter = require("./Routes/orderRoutes");
const userRouter = require("./Routes/userRoutes");
const productsRouter = require("./Routes/productsRoutes");
const app = express();

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "client", "build")));
// Development login
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

// Compressing the JSON responses
app.use(compression());

// Allow Cross-Origin Resource Sharing
app.use(cors());

// Implement Routes
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);
app.get("/api/v1/categories", productsController.getAllCategories);

// Handling Unhandled Routes - must be the last
app.all("/api/v1/*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
// Serving the front-end files
app.get("*", async (req, res) => {
	res.sendFile(pa.join(__dirname, "client", "build", "index.html"));
});

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
