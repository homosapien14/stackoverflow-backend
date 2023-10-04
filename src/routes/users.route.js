const express = require("express");
const {
  validateUserData,
  checkExistence,
} = require("../middlewares/user.middleware");

const usersController = require("../controllers/users.controller");

const router = express.Router();

/** @route      GET /api/users
 *  @desc       fetch all the users
 */
router.get("/", usersController.getAllUsers);

/** @route      GET /api/users/:id
 *  @desc       fetch single user
 */
router.get("/:id", usersController.getUserById);

/** @route      POST /api/users/signup
 *  @desc       register a new user
 */
router.post(
  "/signup",
  validateUserData,
  checkExistence,
  usersController.signUp
);
/** @route      POST /api/users/signin
 *  @desc       login a user
 */
router.post("/signin", usersController.signIn);

module.exports = router;
