const mongoose = require("mongoose");
const User = require("./userModel");

const invoiceSchema = new mongoose.Schema(
	{
		seller: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "A invoice must belong to a seller"],
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				received: {
					type: Boolean,
					default: false,
				},
				sent: {
					type: Boolean,
					default: false,
				},
			},
		],
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		shippingAddress: {
			state: String,
			city: String,
			street: String,
			streetNum: Number,
			state: String,
		},
		total: {
			type: Number,
			required: true,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

invoiceSchema.index({ seller: 1 });

invoiceSchema.pre(/^find/, function (next) {
	this.populate("products.product").populate("user");
	next();
});
const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
