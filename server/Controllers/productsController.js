const Product = require("./../Models/productModel");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

const getAllProducts = factory.getAll(Product);
const getProduct = factory.getOne(Product, { path: "reviews" });
const createProduct = factory.createOne(Product);
const updateProduct = factory.updateOne(Product);
const deleteProduct = factory.deleteOne(Product);

module.exports = {
	getAllProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
