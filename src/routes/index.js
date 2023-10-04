const express = require("express");

const router = express.Router();

router.use("/users", require("./users.route"));
router.use("/posts", require("./posts.route"));
// router.use("/tags", require("./tags.router"));
// router.use("/posts/answers", require("./answers.router"));
// router.use("/posts/comments", require("./comments.router"));

module.exports = router;
