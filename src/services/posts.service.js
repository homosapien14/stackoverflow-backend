const PostsRepository = require("../repository/posts.repository");

class PostsService {
  constructor() {
    this.PostsRepository = new PostsRepository();
  }

  async createPost(data) {
    try {
      const post = await this.PostsRepository.create(data);
      return { ...post, numberOfAnswers: 0 };
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async getPost(id) {
    try {
      const post = await this.PostsRepository.getById(id);
      return post;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  async updatePost(id, data) {
    try {
      const post = await this.PostsRepository.update(id, data);
      return post;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  async getAllPosts() {
    try {
      const posts = await this.PostsRepository.getAll();
      return posts;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  async deletePost(id) {
    try {
      const post = await this.PostsRepository.delete(id);
      return post;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  async upvotePost(postId, user_id) {
    try {
      const post = await this.PostsRepository.upvote(postId, user_id);
      return post;
    } catch (error) {
      console.log("Something went wrong in the PostService layer");
      throw error;
    }
  }
  async downvotePost(postId, user_id) {
    try {
      const post = await this.PostsRepository.downvote(postId, user_id);
      return post;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
}

module.exports = PostsService;
