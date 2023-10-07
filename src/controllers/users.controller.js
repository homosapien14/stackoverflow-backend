// const { response } = require("express");
const UserService = require("../services/users.service");

const userService = new UserService();

const signUp = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };
    console.log(data.username);
    const response = await userService.create(data);
    return res.status(201).json({
      success: true,
      message: "Successfully created a new user",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.username,
      req.body.password
    );
    return res.status(200).json({
      success: true,
      data: response,
      err: {},
      message: "Successfully signed in",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const response = await userService.getAllUsers();
    return res.status(200).json({
      success: true,
      data: response,
      err: {},
      message: "Successfully got all users",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};
const auth = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    // console.log(req.headers);
    const response = await userService.isAuthenticated(token);
    const user = await userService.getById(response);
    const data = {
      username: user.username,
      id: user._id,
      views: user.views,
    };
    return res.status(200).json({
      success: true,
      data: data,
      err: {},
      message: "Successfully got user",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Authentication failded , Need to Login once again",
      data: {
        authentication: false,
      },
      success: false,
      err: error,
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userService.getById(id);
    return res.status(200).json({
      success: true,
      data: response,
      err: {},
      message: "Successfully got user",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};
module.exports = {
  signUp,
  signIn,
  getUserById,
  getAllUsers,
  auth,
};
