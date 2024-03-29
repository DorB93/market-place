const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please tell us your name!"],
		},
		email: {
			type: String,
			required: [true, "Please provide your email!"],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, "Please provide a valid email!"],
		},
		role: {
			type: String,
			enum: ["user", "seller", "admin"],
			default: "user",
		},
		photo: {
			type: String,
			default: "default.jpg",
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minlength: [
				8,
				"A password name must have more or equal then 8 characters",
			],
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, "Please confirm your password"],
			validate: {
				// Only work on SAVE & CREATE!!
				validator: function (val) {
					return val === this.password;
				},
				message: "password Confirm ({VALUE}) should be identical to password",
			},
		},
		passwordChangedAt: { type: Date, default: Date.now() },
		passwordResetToken: String,
		passwordResetExpires: Date,
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
		shippingAddress: {
			state: String,
			city: String,
			street: String,
			streetNum: Number,
			postCode: String,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Hashing Password
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password") || this.isNew) return next();
	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changesPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return changedTimestamp > JWTTimestamp;
	}
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");
	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");
	this.passwordResetExpires = Date.now() + 600000;
	return resetToken;
};

userSchema.methods.changesPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);

		return changedTimestamp > JWTTimestamp;
	}

	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.passwordResetExpires = Date.now() + 600000;

	return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
