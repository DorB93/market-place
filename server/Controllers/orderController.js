const Order = require("../models/orderModel");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

const getAllOrders = factory.getAll(Order);
const getOrder = factory.getOne(Order);
const createOrder = factory.createOne(Order);
const updateOrder = factory.updateOne(Order);
const deleteOrder = factory.deleteOne(Order);

module.exports = {
	getAllOrders,
	getOrder,
	createOrder,
	updateOrder,
	deleteOrder,
};
