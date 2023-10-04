const AnswersService = require("../services/answers.service");

const answersService = new AnswersService();

const addAnswer = async (req, res) => {
  try {
    const data = {
      body: req.body.body,
      user_id: res.locals.user_id,
      post_id: req.params.id,
    };
    const response = await answersService.createAnswer(data);
    return res.status(201).json({
      success: true,
      message: "Successfully Answer a new Answer",
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

const updateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      title: req.body.title,
      body: req.body.body,
      user_id: res.locals.user_id,
    };
    const response = await answersService.updateAnswer(id, updateData);
    return res.status(200).json({
      success: true,
      message: "Successfully update Answer",
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
const getAnswers = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await answersService.getAllAnswers(id);
    return res.status(200).json({
      success: true,
      message: "Successfully received all Answers",
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

const deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await answersService.deleteAnswer(id);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted Answer",
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

module.exports = {
  addAnswer,
  deleteAnswer,
  getAnswers,
  updateAnswer,
};
