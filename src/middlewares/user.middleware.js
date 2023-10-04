const UserRepository = require("../repository/user.repository");
const userRepository = new UserRepository();

const validateUserData = (req, res, next) => {
  const { username, password } = req.body;
  if (username.length < 5 || password.length < 8) {
    return res.status(403).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "please enter valid length username/password",
    });
  }
  next();
};

const checkExistence = async (req, res, next) => {
  const { username } = req.body;

  const user = await userRepository.getByUsername(username);

  if (user !== null) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "User already Exists",
    });
  }

  next();
};
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Need to Login",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  validateUserData,
  checkExistence,
  isAuthenticated,
};
