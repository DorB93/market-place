const express = require("express");

const reviewRouter = require("./reviewsRoutes");
const productsController = require("../controllers/productsController");
const authController = require("../controllers/authController");

const router = express.Router();

// Nested Route
router.use("/:productId/reviews", reviewRouter);

router
	.route("/")
	.get(productsController.getAllProducts)
	.post(
		authController.protect,
		authController.restrictTo("admin", "seller"),
		productsController.setSellerId,
		productsController.createProduct
	);

router
	.route("/:id")
	.get(productsController.getProduct)
	.patch(
		authController.protect,
		authController.restrictTo("admin", "seller"),
		productsController.updateProduct
	)
	.delete(
		authController.protect,
		authController.restrictTo("admin", "lead-guide"),
		productsController.deleteProduct
	);

module.exports = router;
