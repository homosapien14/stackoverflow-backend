const express = require("express");

const postsController = require("../controllers/posts.controller");
const { auth } = require("../middlewares/user.middleware");
const {
  validatePostData,
  checkOwnership,
} = require("../middlewares/posts.middleware");
const router = express.Router();

/** @route      GET /api/posts
 *  @desc       fetch all posts
 */
router.get("/", postsController.getAllPosts);

/** @route      GET /api/posts/:id
 *  @desc       fetch a single post
 */
router.get("/:id", postsController.getPostById);

/** @route      POST /api/posts/
 *  @desc       add a post
 */
router.post("/", auth, validatePostData, postsController.addPost);

/** @route      DELETE /api/posts/:id
 *  @desc       delete a post
 */
router.delete("/:id", auth, postsController.deletePost);

/** @route      PUT /api/posts/upvote
 *  @desc       update a post
 */
router.put("/:id", auth, postsController.updatePost);
/** @route      PATCH /api/posts/upvote
 *  @desc       upvote a post
 */
router.patch("/upvote", auth, postsController.upvotePost);

/** @route      PATCH /api/posts/downvote
 *  @desc       downvote a post
 */
router.patch("/downvote", auth, postsController.downvotePost);

module.exports = router;
