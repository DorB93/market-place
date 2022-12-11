const mongoose = require("mongoose");
const Product = require("./productModel");
const User = require("./userModel");

const orderSchema = new mongoose.Schema({
	products: [
		{
			type: mongoose.Schema.ObjectId,
			ref: Product,
			required: [true, "Cart Must have a product!"],
			quantity: {
				type: Number,
				required: [],
			},
			price: {
				type: Number,
				require: [true, "Product must have a price"],
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: User,
		required: [true, "Cart Must belong to a user!"],
	},
	createAt: {
		type: Date,
		default: Date.now(),
	},
	paid: {
		type: Boolean,
		default: true,
	},
});

orderSchema.pre(/^find/, function (next) {
	this.populate("user").populate({
		path: "product",
		select: ["name", "seller"],
	});
	next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
