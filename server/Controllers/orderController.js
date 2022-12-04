const Order = require("../models/orderModel");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

const getAllOrders = factory.getAll(Order);
const getOrder = factory.getOne(Order);
const createOrder = factory.createOne(Order);
const updateOrder = factory.updateOne(Order);
const deleteOrder = factory.deleteOne(Order);

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
	getAllSellerOrders,
	getAllOrders,
	getOrder,
	createOrder,
	updateOrder,
	deleteOrder,
};
