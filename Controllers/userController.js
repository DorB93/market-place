const multer = require("multer");
const sharp = require("sharp");

const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const factory = require("./handlerFactory");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("Not an image! Please upload only images.", 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

const uploadUserPhoto = upload.single("photo");

async function resizeUserPhoto(req, res, next) {
	try {
		if (!req.file) {
			return next();
		}
		req.file.filename = `user-${req.user._id}}.jpeg`;
		await sharp(req.file.buffer)
			.resize(500, 500)
			.toFormat("jpeg")
			.jpeg({ quality: 90 })
			.toFile(`client/public/img/users/${req.file.filename}`);
		req.body.photo = req.file.filename;
		next();
	} catch (err) {
		next(err);
	}
}

function filterObj(obj, ...allowedFields) {
	let filteredObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) {
			filteredObj[el] = obj[el];
		}
	});
	return filteredObj;
}
async function getMe(req, _, next) {
	req.params.id = req.user._id;
	next();
}
async function updateMe(req, res, next) {
	try {
		// 1) Create error if user POSTs Password data
		if (req.body.password || req.body.passwordConfirm) {
			return next(
				new AppError(
					"This route is not for password updates!!. Please use /updateMyPassword route!",
					400
				)
			);
		}
		// 2) Filtered out unwanted fields names that are not allowed to be updated
		const filteredBody = filterObj(req.body, "name", "email", "photo");
		// 3) update user doc
		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			filteredBody,
			{
				new: true,
				runValidators: true,
			}
		);
		console.log({ filteredBody });

		res.status(200).json({
			status: "success",
			data: {
				user: updatedUser,
			},
		});
	} catch (err) {
		next(err);
	}
}

async function deleteMe(req, res, next) {
	try {
		await User.findByIdAndUpdate(req.user._id, { active: false });
		res.status(204).json({
			status: "success",
			data: null,
		});
	} catch (err) {
		next(err);
	}
}

function createUser(_, res) {
	res.status(500).json({
		status: "error",
		Message: "This route is not defined! Please use /signup instead",
	});
}

const getAllUsers = factory.getAll(User);
const getUser = factory.getOne(User);
const updateUser = factory.updateOne(User);
const deleteUser = factory.deleteOne(User);

module.exports = {
	getMe,
	getAllUsers,
	createUser,
	getUser,
	updateUser,
	deleteUser,
	updateMe,
	deleteMe,
	uploadUserPhoto,
	resizeUserPhoto,
};
