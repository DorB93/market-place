require("dotenv").config({ path: "./.env", override: true });
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("./../Models/userModel");
const sendEmail = require("../utils/email");

function createSendToken(user, statusCode, res) {
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

	res.cookie("jwt", token, cookieOptions);

	user.password = undefined;

	res.status(statusCode).json({
		status: "success",
		data: {
			...user,
		},
	});
}

async function signUp(req, res, next) {
	try {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			role: req.body.role,
			photo: req.body.photo,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
		});
		createSendToken(newUser, 201, res);
	} catch (err) {
		next(err);
	}
}

async function login(req, res, next) {
	try {
		const { email, password } = req.body;

		// Check if email & password exist
		if (!email || !password) {
			return next(new AppError("Please provide email and password!", 400));
		}
		// Find user
		const user = await User.findOne({ email }).select("+password");

		if (!user || !(await user.correctPassword(password, user.password))) {
			return next(new AppError("Incorrect email or password", 401));
		}
		createSendToken(user, 200, res);
	} catch (err) {
		next(err);
	}
}

async function protect(req, res, next) {
	try {
		// Getting token and check if is it there

		let token;
		if (req.cookies.jwt) {
			token = req.cookies.jwt;
		}

		if (!token)
			return next(
				new AppError("You are not logged in! Please log in to ger access", 401)
			);
		// Verification token
		const data = jwt.verify(token, process.env.JWT_SECRET);

		// check if user still exists
		const freshUser = await User.findById(data.id);
		if (!freshUser) {
			return next(new AppError("This user no longer exists.", 401));
		}
		// Check user changed password after the token eas issued
		if (freshUser.changesPasswordAfter(data.iat)) {
			return next(
				new AppError(
					"User recently changed the password! Please log in again",
					401
				)
			);
		}

		// Grant Access To Protected Routes
		req.user = freshUser;
		next();
	} catch (err) {
		next(err);
	}
}

const restrictTo = (...roles) => {
	return (req, res, next) => {
		try {
			if (!roles.includes(req.user.role))
				throw new AppError(
					"You don't have permission to perform this action",
					403
				);
			next();
		} catch (err) {
			next(err);
		}
	};
};

async function forgotPassword(req, res, next) {
	try {
		// Get user based on POSTed email
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return next(new AppError("There is no user with that address", 404));
		}
		const resetToken = user.createPasswordResetToken();
		await user.save({ validateBeforeSave: false });

		const resetURL = `${req.protocol}://${req.get(
			"host"
		)}/api/v1/users/resetPassword/${resetToken}`;

		const message = `Forgot your password? Submit a PATCH request with your new password & passwordConfirm to: ${resetURL}.\n If you didn't forgot your password, Please ignore this email!`;

		await sendEmail({
			email: user.email,
			subject: "Your password reset token (valid for 10 min)",
			message,
		}).catch(async () => {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			await user.save({ validateBeforeSave: false });
			next(
				new AppError(
					"There was an error sending the email. Try again later!",
					500
				)
			);
		});

		res.status(200).json({
			status: "success",
			message: "Token sent to email!",
		});
	} catch (err) {
		next(err);
	}
}

async function resetPassword(req, res, next) {
	try {
		// 1) Get user based on the token
		const hashedToken = crypto
			.createHash("sha256")
			.update(req.params.token)
			.digest("hex");

		const user = await User.findOne({
			passwordResetToken: hashedToken,
			passwordResetExpires: { $gt: Date.now() },
		});
		// 2) If token not expired, and there is a user. set the new password
		if (!user) {
			next(new AppError("Token is invalid or expired!", 400));
		}
		user.password = req.body.password;
		user.passwordConfirm = req.body.passwordConfirm;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		// update the changedPasswordAt for the user
		user.passwordChangedAt = Date.now();
		await user.save();
		// Log in the user, send a JWT token
		createSendToken(user, 201, res);
	} catch (err) {
		next(err);
	}
}

async function updatePassword(req, res, next) {
	try {
		// 1) Get user from collation
		const user = await User.findById(req.user._id).select("+password");

		// 2) Check posted password is correct
		const { password } = req.body;
		if (!(await user.correctPassword(password, user.password))) {
			return next(new AppError("Wrong Password! Please try again", 401));
		}
		// 3) If true, update the password
		const { newPassword, newPasswordConfirm } = req.body;
		user.password = newPassword;
		user.passwordConfirm = newPasswordConfirm;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save();

		// 4) log user in, send new JWT
		createSendToken(user, 200, res);
	} catch (err) {
		next(err);
	}
}

module.exports = {
	signUp,
	login,
	protect,
	restrictTo,
	forgotPassword,
	resetPassword,
	updatePassword,
};
