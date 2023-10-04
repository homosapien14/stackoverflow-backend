const { response } = require("express");
const UserService = require("../services/users.service");

const userService = new UserService();

const signUp = async (req, res) => {
  try {
    console.log(req.body.password);
    const data = {
      username: req.body.username,
      password: req.body.password,
    };
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
};
