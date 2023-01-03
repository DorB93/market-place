const Invoice = require("../Models/invoiceModel");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.getMyInvoices = async function (req, res, next) {
	try {
		const invoices = await Invoice.find({ seller: req.user._id });
		res.status(200).json({
			status: "success",
			results: invoices.length,
			data: {
				invoices,
			},
		});
	} catch (err) {
		next(err);
	}
};
exports.getOneInvoice = async function (req, res, next) {
	try {
		const invoice = await Invoice.findById(req.params.id);
		if (req.user.role !== "admin" && invoice.seller._id !== req.user.id) {
			throw new AppError(
				"You don't have permission to perform this action",
				403
			);
		}
		res.status(200).json({
			status: "success",
			data: {
				invoice,
			},
		});
	} catch (err) {
		next(err);
	}
};
exports.getAllInvoices = factory.getAll(Invoice);
exports.updateInvoice = factory.updateOne(Invoice);
