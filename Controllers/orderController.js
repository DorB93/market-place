const Order = require("../models/orderModel");
// const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

const getAllOrders = factory.getAll(Order);
const getOrder = factory.getOne(Order);
const createOrder = factory.createOne(Order);
const updateOrder = factory.updateOne(Order);
const deleteOrder = factory.deleteOne(Order);
const getUserIdToReq = function (req, res, next) {
	req.body.user = req.user._id;
	next();
};
const getAllSellerOrders = async function (req, res, next) {
	try {
		const doc = await Order.find({ seller: req.user._id });
		res.status(200).json({
			status: "success",
			results: doc.length,
			data: {
				data: doc,
			},
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getUserIdToReq,
	getAllSellerOrders,
	getAllOrders,
	getOrder,
	createOrder,
	updateOrder,
	deleteOrder,
};
