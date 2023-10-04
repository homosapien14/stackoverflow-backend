const { Answers, Post } = require("../models");

class AnswersRepository {
  async create(data) {
    try {
      const answer = await Answers.create(data);
      // const post = await Post.findByIdAndUpdate(
      //   { _id: answer.post_id },
      //   { $inc: { numberOfAnswers: 1 } },
      //   { new: true }
      // );
      return answer;
    } catch (error) {
      console.log("something went wrong in answerRepo level");
      throw error;
    }
  }

  async get(id) {
    try {
      const data = await Answers.find({ post_id: id })
        .populate("user_id")
        .populate("post_id");
      return data;
    } catch (error) {
      console.log("something went wrong in Postrepository level");
      throw error;
    }
  }

  async delete(id) {
    try {
      const answer = await Answers.findByIdAndDelete(id);
      // const post = await Post.findByIdAndUpdate(
      //   { _id: answer.post_id },
      //   { $inc: { numberOfAnswers: -1 } },
      //   { new: true }
      // );
      return { post, answer };
    } catch (error) {
      console.log("something went wrong in Postrepository level");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const answer = await Answers.findByIdAndUpdate(id, data, { new: true });
      return answer;
    } catch (error) {
      console.log("something went wrong in Postrepository level");
      throw error;
    }
  }
}

module.exports = AnswersRepository;
