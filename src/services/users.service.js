const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRepository = require("../repository/user.repository");
const { JWT_KEY, SALT } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const hashPassword = this.encryptPassword(data.password);
      console.log(hashPassword);
      const userData = {
        ...data,
        password: hashPassword,
      };
      // console.log(userData);
      const user = await this.userRepository.create(userData);
      const newJWT = this.createToken({
        username: user.username,
        id: user._id,
      });
      return {
        token: newJWT,
        username: user.username,
        id: user._id,
        views: user.views,
      };
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async signIn(username, plainPassword) {
    try {
      // step 1-> fetch the user using the username
      const user = await this.userRepository.getByUsername(username);
      // step 2-> compare incoming plain password with stores encrypted password
      if (user === null) {
        console.log("Password doesn't match");
        throw { error: "User does not exist" };
      }
      const passwordsMatch = this.checkPassword(plainPassword, user.password);

      if (!passwordsMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect password" };
      }
      // step 3-> if passwords match then create a token and send it to the user
      const newJWT = this.createToken({ username: username, id: user._id }); // unique thing
      return { token: newJWT };
    } catch (error) {
      console.log("Something went wrong in the sign in process");
      throw error;
    }
  }
  async getAllUsers() {
    try {
      const users = await this.userRepository.getAllUser();
      return users;
    } catch (error) {
      console.log("Something went wrong in getting all users");
      throw error;
    }
  }
  async getById(id) {
    try {
      const users = await this.userRepository.getById(id);
      return users;
    } catch (error) {
      console.log("Something went wrong to get the user by ID");
      throw error;
    }
  }
  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user._id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw error;
    }
  }

  createToken(user) {
    try {
      //header -> hashing algo(SHA256)
      //payload -> userName
      //signature -> header+ payload -> token
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" }); //token
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }
  encryptPassword(plainPassword) {
    console.log(plainPassword);
    try {
      const hash = bcrypt.hashSync(plainPassword, SALT);
      return hash;
    } catch (error) {
      console.log("Something went wrong in password encryption");
      throw error;
    }
  }
  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }
}

module.exports = UserService;
