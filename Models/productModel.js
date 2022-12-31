const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A product must have a name"],
			unique: true,
			trim: true,
			maxlength: [
				50,
				"A product name must have less or equal then 50 characters",
			],
			minlength: [
				5,
				"A product name must have more or equal then 5 characters",
			],
		},
		slug: String,
		category: {
			type: String,
			required: [true, "A product must have a category"],
		},
		inventory: {
			type: Number,
			required: [true, "A product must have a inventory"],
		},
		bought: {
			type: Number,
			default: 0,
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		ratingsAverage: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			required: [true, "A product must have a price"],
		},
		summary: {
			type: String,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
			required: [true, "A product must have a description"],
		},
		image: {
			type: String,
			default: "default.jpg",
		},
		seller: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "A product must have a seller"],
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

productSchema.index({ price: 1, ratingsAverage: -1 });
productSchema.index({ category: 1 });
productSchema.index({ seller: 1 });

productSchema.virtual("reviews", {
	ref: "Review",
	foreignField: "product",
	localField: "_id",
	justOne: false,
});

productSchema.pre(/^find/, function (next) {
	this.populate({
		path: "seller",
		select: ["-__v", "-passwordChangedAt"],
	});
	next();
});

if (mongoose.models.Product) {
	delete mongoose.models.Product;
}
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
