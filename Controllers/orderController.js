const Order = require("../Models/orderModel");
const AppError = require("../utils/appError");
// const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

const getAllOrders = factory.getAll(Order);
const getOrder = factory.getOne(Order);
const createOrder = factory.createOne(Order);
const deleteOrder = factory.deleteOne(Order);
const updateOrder = async function (req, res, next) {
	try {
		const orderData = await Order.findOne({ _id: req.params.id });
		if (!orderData) {
			return next(new AppError("No document found with that ID", 404));
		}
		if (req.user.role !== "admin" && orderData.user.id !== req.user.id) {
			return next(
				new AppError("You don't have permission to perform this action", 403)
			);
		}
		const doc = await Order.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				...doc,
			},
		});
	} catch (err) {
		next(err);
	}
};
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

const getMyOrders = async function (req, res, next) {
	try {
		const doc = await Order.find({ user: req.user._id });
		res.status(200).json({
			status: "success",
			results: doc.length,
			data: [...doc],
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
	getMyOrders,
};
