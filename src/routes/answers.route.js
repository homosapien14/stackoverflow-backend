const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { auth } = require("../middlewares/user.middleware");
const answersController = require("../controllers/answers.controller");

/** @route      GET /api/posts/answers/:id
 *  @desc       fetch all answers of a post
 */
router.get("/:id", answersController.getAnswers);

/** @route      POST /api/posts/answers/:id
 *  @desc       add an answer to a post
 */
router.post(
  "/:id",
  auth,
  check("text", "Answer is required").not().isEmpty(),
  answersController.addAnswer
);

/** @route      DELETE /api/posts/answers/:id
 *  @desc       delete an answer to a post
 */
router.delete("/:id", auth, answersController.deleteAnswer);

/** @route      PUT /api/posts/answers/:id
 *  @desc       update an answer to a post
 */
router.put("/:id", auth, answersController.updateAnswer);

module.exports = router;
