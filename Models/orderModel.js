const mongoose = require("mongoose");
const Product = require("./productModel");
const User = require("./userModel");

const orderSchema = new mongoose.Schema({
	products: [
		{
			product: {
				type: mongoose.Schema.ObjectId,
				ref: Product,
				required: [true, "Cart Must have a product!"],
			},
			quantity: {
				type: Number,
				required: [true, "Product must have quantity"],
				validate: {
					validator: async function (value) {
						const productInventory = await Product.findById(
							this.product
						).select("inventory");
						return value <= productInventory.inventory;
					},
					message:
						"The quantity of the product cannot be bigger than the inventory that in the stock",
				},
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
	shippingAddress: {
		state: { type: String, required: true },
		city: { type: String, required: true },
		street: { type: String, required: true },
		streetNum: { type: Number, required: true },
		zipCode: { type: String, required: true },
	},
});

orderSchema.pre(/^find/, function (next) {
	this.populate("user").populate({
		path: "product",
		select: ["name", "seller"],
	});
	next();
});

orderSchema.pre("save", async function (next) {
	const order = this;

	// Update the inventory of each product in the order
	for (const product of order.products) {
		const productInventory = await Product.findById(product.product).select(
			"inventory bought"
		);
		const newInventory = productInventory.inventory - product.quantity;
		const newBought = productInventory.bought + product.quantity;
		await Product.findByIdAndUpdate(product.product, {
			inventory: newInventory,
			bought: newBought,
		});
	}

	next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
