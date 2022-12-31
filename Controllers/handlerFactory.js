const AppError = require("../utils/appError");

exports.deleteOne = (Model) =>
	async function (req, res, next) {
		try {
			const doc = await Model.findByIdAndDelete(req.params.id);

			if (!doc) {
				return next(new AppError("No document found with that ID", 404));
			}
			res.status(204).json({
				status: "success",
				data: null,
			});
		} catch (err) {
			next(err);
		}
	};

exports.updateOne = (Model) =>
	async function (req, res, next) {
		try {
			const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			// console.log({ doc });
			if (!doc) {
				return next(new AppError("No document found with that ID", 404));
			}
			res.status(200).json({
				status: "success",
				data: {
					...doc,
				},
			});
		} catch (err) {
			next(err);
		}
	};

exports.createOne = (Model) =>
	async function (req, res, next) {
		try {
			const doc = await Model.create(req.body);
			res.status(201).json({
				status: "success",
				data: {
					...doc,
				},
			});
		} catch (err) {
			next(err);
		}
	};

exports.getOne = (Model, popOptions) =>
	async function (req, res, next) {
		try {
			let query = Model.findById(req.params.id);
			if (popOptions) query = query.populate(popOptions);
			const doc = await query;

			if (!doc) {
				return next(new AppError("No document found with that ID", 404));
			}
			res.status(200).json({
				status: "success",
				data: {
					...doc,
				},
			});
		} catch (err) {
			next(err);
		}
	};

exports.getAll = (Model) =>
	async function (req, res, next) {
		try {
			const doc = await Model.find();
			res.status(200).json({
				status: "success",
				results: doc.length,
				data: [...doc],
			});
		} catch (err) {
			next(err);
		}
	};
