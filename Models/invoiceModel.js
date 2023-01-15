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
			postCode: String,
		},
		total: {
			type: Number,
			required: true,
		},
		createAt: {
			type: Date,
			default: Date.now(),
		},
		sent: {
			type: Boolean,
			default: false,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

invoiceSchema.index({ seller: 1 });

invoiceSchema.pre(/^find/, function (next) {
	this.populate("products.product").populate("user").populate("seller");
	next();
});
const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
