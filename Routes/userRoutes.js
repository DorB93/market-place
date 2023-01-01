const express = require("express");

const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// From here only for logged in
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
	"/updateMe",
	userController.uploadUserPhoto,
	userController.resizeUserPhoto,
	userController.updateMe
);
router.delete("/deleteMe", userController.deleteMe);

// From here only for administrator
router
	.route("/")
	.get(authController.restrictTo("admin"), userController.getAllUsers)
	.post(authController.restrictTo("admin"), userController.createUser);

router
	.route("/:id")
	.get(authController.restrictTo("admin"), userController.getUser)
	.patch(authController.restrictTo("admin"), userController.updateUser)
	.delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;
