const Review = require("./../Models/reviewModel");
const factory = require("./handlerFactory");

function setTourUserIds(req, res, next) {
	// allow Nested routes
	if (!req.body.product) req.body.product = req.params.productId;
	if (!req.body.user) req.body.user = req.user._id;
	next();
}

const getAllReviews = factory.getAll(Review);
const getReview = factory.getOne(Review);
const createReview = factory.createOne(Review);
const updateReview = factory.updateOne(Review);
const deleteReview = factory.deleteOne(Review);

module.exports = {
	setTourUserIds,
	getReview,
	createReview,
	updateReview,
	getAllReviews,
	deleteReview,
};
