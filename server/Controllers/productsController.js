const Product = require("./../Models/productModel");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

function setSellerId(req, res, next) {
	if (!req.body.user) req.body.seller = req.user._id;
	next();
}

const getAllProducts = factory.getAll(Product);
const getProduct = factory.getOne(Product, { path: "reviews" });
const createProduct = factory.createOne(Product);
const updateProduct = factory.updateOne(Product);
const deleteProduct = factory.deleteOne(Product);

module.exports = {
	getAllProducts,
	setSellerId,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
