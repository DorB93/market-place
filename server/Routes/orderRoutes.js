const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");
const router = express.Router();
router.use(authController.protect);

router.get("/my-customers-orders", orderController.getAllSellerOrders);

router
	.route("/")
	.get(authController.restrictTo("admin"), orderController.getAllOrders)
	.post(authController.restrictTo("user"), orderController.createOrder);

router
	.route("/:id")
	.get(orderController.getOrder)
	.patch(
		authController.restrictTo("admin", "user"),
		orderController.updateOrder
	)
	.delete(
		authController.restrictTo("admin", "user"),
		orderController.deleteOrder
	);

module.exports = router;
