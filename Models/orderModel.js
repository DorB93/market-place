const mongoose = require("mongoose");
const Invoice = require("./invoiceModel");
const Product = require("./productModel");

const orderSchema = new mongoose.Schema({
	products: [
		{
			product: {
				type: mongoose.Schema.ObjectId,
				ref: "Product",
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
			received: {
				type: Boolean,
				default: false,
			},
			seller: {
				type: mongoose.Schema.ObjectId,
				ref: "User",
				required: [true, "A Product Must belong to a Seller!"],
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: [true, "Cart Must belong to a user!"],
	},
	createAt: {
		type: Date,
		default: Date.now(),
	},
	totalCost: {
		type: Number,
		require: true,
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

// orderSchema.pre(/^find/, function (next) {
// 	this.populate("user").populate("product");
// 	next();
// });
orderSchema.pre(/^find/, function (next) {
	this.populate("products.product").populate("user");
	// .populate("products.product.seller");
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
orderSchema.pre("save", async function (next) {
	const order = this;
	const sellersProducts = order.products.reduce(
		(acc, { product, quantity, received, price, seller }) => {
			if (acc[seller]) {
				acc[seller].push({ product, received, price, quantity });
			} else {
				acc[seller] = [{ product, received, price, quantity }];
			}
			return acc;
		},
		{}
	);
	const arrInvoicesPromises = Object.entries(sellersProducts).map(
		async ([seller, products]) => {
			const total = products.reduce(
				(sum, { price, quantity }) => sum + price * quantity,
				0
			);
			const { shippingAddress, user } = order;
			try {
				const sellerInvoice = await Invoice.create({
					seller,
					products,
					user,
					shippingAddress,
					total,
				});
				return sellerInvoice;
			} catch (err) {
				return err;
			}
		}
	);
	await Promise.all(arrInvoicesPromises);
	next();
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
