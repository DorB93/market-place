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
const uploadProductImages = upload.fields([{ name: "images", maxCount: 3 }]);

async function resizeProductImages(req, res, next) {
	try {
		if (!req.files.images) return next();
		// Images
		req.body.images = [];

		await Promise.all(
			req.files.images.map(async (file, i) => {
				const filename = `product-${req.params.id}-${i + 1}.jpeg`;

				await sharp(file.buffer)
					.resize(2000, 1333)
					.toFormat("jpeg")
					.jpeg({ quality: 90 })
					.toFile(`public/img/products/${filename}`);

				req.body.images.push(filename);
			})
		);

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
	uploadProductImages,
	resizeProductImages,
};
