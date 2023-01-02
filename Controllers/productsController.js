const multer = require("multer");
const sharp = require("sharp");

const Product = require("./../Models/productModel");
// const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("Not an image! Please upload only images.", 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});
const uploadProductImages = upload.single("image");

async function resizeProductImages(req, res, next) {
	try {
		if (!req.file?.fieldname) {
			return next();
		}
		const filename = `product-${req.params.id}.jpeg`;
		await sharp(req.file.buffer)
			.resize({ width: 2000, height: 2000, fit: sharp.fit.fill })
			.toFormat("jpeg")
			.jpeg({ quality: 100 })
			.toFile(`client/public/img/products/${filename}`);
		req.body.image = filename;

		next();
	} catch (err) {
		next(err);
	}
}

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
			data: { data: [...categories] },
		});
	} catch (err) {}
}
const getAllProducts = factory.getAll(Product);
const getProduct = factory.getOne(Product, { path: "reviews" });
const createProduct = factory.createOne(Product);
const updateProduct = factory.updateOne(Product);
const deleteProduct = factory.deleteOne(Product);

async function getMyProducts(req, res, next) {
	try {
		const doc = await Product.find({ seller: req.user._id });
		res.status(200).json({
			status: "success",
			data: {
				...doc,
			},
		});
	} catch (err) {
		next(err);
	}
}
module.exports = {
	getAllCategories,
	getAllProducts,
	setSellerId,
	getProduct,
	getMyProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	uploadProductImages,
	resizeProductImages,
};
