const AnswersRepository = require("../repository/answers.repository");

class AnswersService {
  constructor() {
    this.AnswersRepository = new AnswersRepository();
  }

  async createAnswer(data) {
    console.log(data);
    try {
      const answer = await this.AnswersRepository.create(data);
      return answer;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async updateAnswer(id, data) {
    try {
      const Answer = await this.AnswersRepository.update(id, data);
      return Answer;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  async getAllAnswers(id) {
    try {
      const Answers = await this.AnswersRepository.get(id);
      return Answers;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  async deleteAnswer(id) {
    try {
      const Answer = await this.AnswersRepository.delete(id);
      return Answer;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
}

module.exports = AnswersService;
