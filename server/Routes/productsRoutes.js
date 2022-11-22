const express = require("express");

const productsController = require("../controllers/productsController");
const authController = require("../controllers/authController");

const router = express.Router();

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
