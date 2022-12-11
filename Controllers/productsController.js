const Product = require("./../Models/productModel");
// const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

function setSellerId(req, res, next) {
	if (!req.body.user) req.body.seller = req.user._id;
	next();
}
async function getAllCategories(req, res, next) {
	try {
		const categories = await Product.distinct("category");
		res.status(200).json({
			status: "success",
			results: categories.length,
			data: {
				categories,
			},
		});
	} catch (err) {}
}
const getAllProducts = factory.getAll(Product);
const getProduct = factory.getOne(Product, { path: "reviews" });
const createProduct = factory.createOne(Product);
const updateProduct = factory.updateOne(Product);
const deleteProduct = factory.deleteOne(Product);

module.exports = {
	getAllCategories,
	getAllProducts,
	setSellerId,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
