const express = require("express");

const authController = require("../Controllers/authController");
const invoiceController = require("../Controllers/invoiceController");

const router = express.Router();

router.use(authController.protect);

router
	.route("/")
	.get(authController.restrictTo("admin"), invoiceController.getAllInvoices);

router.route("/my-invoices").get(invoiceController.getMyInvoices);

router
	.route("/:id")
	.get(invoiceController.getOneInvoice)
	.patch(invoiceController.updateInvoice);

module.exports = router;
