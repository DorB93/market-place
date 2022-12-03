const mongoose = require("mongoose");
const Product = require("./productModel");

const reviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			trim: true,
		},
		rating: {
			type: Number,
			require: true,
			min: [1, "Rating must be above 1.0"],
			max: [5, "Rating must be below 5.0"],
		},
		createAt: { type: Date, default: Date.now() },
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "Review must  belong to a user."],
		},
		product: {
			type: mongoose.Schema.ObjectId,
			ref: "Product",
			required: [true, "Review must belong to a product."],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: ["-__v", "-role", "-email", "-passwordChangedAt"],
	});
	next();
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
	const stats = await this.aggregate([
		{ $match: { product: productId } },
		{
			$group: {
				_id: "$product",
				nRating: { $sum: 1 },
				avgRating: { $avg: "$rating" },
			},
		},
	]);
	if (stats.length > 0) {
		await Product.findByIdAndUpdate(productId, {
			ratingsQuantity: stats[0].nRating,
			ratingsAverage: stats[0].avgRating,
		});
	} else {
		await Product.findByIdAndUpdate(productId, {
			ratingsQuantity: 0,
			ratingsAverage: 0,
		});
	}
};

reviewSchema.post("save", function () {
	// this point to current review
	this.constructor.calcAverageRatings(this.product);
});

reviewSchema.post(/^findOne/, async function (doc) {
	await doc.constructor.calcAverageRatings(doc.product);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
