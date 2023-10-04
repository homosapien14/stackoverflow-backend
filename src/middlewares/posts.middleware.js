const validatePostData = (req, res, next) => {
  if (req.body.title.length < 10) {
    return res.status(404).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "please enter valid length title",
    });
  }
  next();
};

const checkOwnership = (req, res, next) => {};

module.exports = {
  validatePostData,
};
