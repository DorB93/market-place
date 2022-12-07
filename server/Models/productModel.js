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
				"A product name must have less or equal then 40 characters",
			],
			minlength: [
				8,
				"A product name must have more or equal then 40 characters",
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
		price: {
			type: Number,
			required: [true, "A tour must have a price"],
		},
		summary: {
			type: String,
			trim: true,
			required: [true, "A tour must have a summary"],
		},
		description: {
			type: String,
			trim: true,
		},
		images: [String],
		seller: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "A tour must have a seller"],
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

productSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
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
