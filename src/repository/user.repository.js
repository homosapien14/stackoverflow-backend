const { User } = require("../models");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong at repository level");
      throw error;
    }
  }
  async getAllUser() {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      console.log("something went wrong at repository level");
      throw error;
    }
  }
  async getById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log("something went wrong at repository level");
      throw error;
    }
  }
  async getByUsername(username) {
    try {
      const user = await User.findOne({ username: username });
      return user;
    } catch (error) {
      console.log("something went wrong at repository level");
      throw error;
    }
  }
  async incrementView(id) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: id },
        { $inc: { views: 1 } },
        { new: true }
      );
      return user;
    } catch (error) {
      console.log("something went wrong at repository level");
      throw error;
    }
  }
}

module.exports = UserRepository;
