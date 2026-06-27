const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = Router();
const authMiddleware = require("../middleware/auth.middleware");

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 *
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @name GET /api/auth/logout
 * @description clear token from user cookies and add token in blacklist
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController);

/**
 * @name GET /api/auth/get-me
 * @description get the currently logged in user details
 * @access Private
 */
authRouter.get(
  "/get-me",
  authMiddleware.authUser,
  authController.getMeController,
);

module.exports = authRouter;
