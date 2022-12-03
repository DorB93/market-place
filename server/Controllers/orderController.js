const stripe = require(`stripe`)(process.env.STRIPE_S_KEY);

const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

async function getCheckoutSession(req, res, next) {
	try {
		// get currently ordered products
		const products = await Promise.all(
			req.body.products.map(async (p) => {
				const product = await Product.findById(p.id);
				if (!product) {
					return new AppError("No product found with that ID", 404);
				}
				const { quantity } = p;
				return { product, quantity };
			})
		);
		const productsData = products.map((p) => {
			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: `${p.product.name}`,
					},
					unit_amount: p.product.price * 100,
				},
				quantity: p.quantity,
			};
		});
		// Create checkout session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			success_url: `${req.protocol}://${req.get("host")}/my-orders?alert=order`,
			cancel_url: `${req.protocol}://${req.get("host")}/`,
			customer_email: req.user.email,
			client_reference_id: req.params.tourID,
			mode: "payment",
			line_items: [...productsData],
		});

		res.status(200).json({
			status: "success",
			session,
		});
	} catch (err) {
		next(err);
	}
}
