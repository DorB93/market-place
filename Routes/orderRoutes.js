const express = require("express");
const orderController = require("../Controllers/orderController");
const authController = require("../Controllers/authController");
const router = express.Router();
router.use(authController.protect);

router.get("/my-customers-orders", orderController.getAllSellerOrders);
router.get("/my-orders", orderController.getMyOrders);
router
	.route("/")
	.get(authController.restrictTo("admin"), orderController.getAllOrders)
	.post(orderController.getUserIdToReq, orderController.createOrder);

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
