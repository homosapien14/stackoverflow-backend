const { validateUserData } = require("../middlewares/user.middleware");
const { Post, Answers, User } = require("../models");

class PostsRepository {
  async create(data) {
    try {
      const post = await Post.create(data);
      return post._doc;
    } catch (error) {
      console.log("something went wrong in Postrepository level");
      throw errors;
    }
  }

  async getAll() {
    try {
      const posts = await Post.find({}).populate("user_id");
      const countAns = this.countAnswers;
      const data = posts.map((post, index) => {
        return {
          ...post._doc,
        };
      });
      return data;
    } catch (error) {
      console.log("something went wrong in Postrepository level");
      throw error;
    }
  }
  async update(id, data) {
    try {
      const post = await Post.findByIdAndUpdate(id, data, { new: true });
      return post;
    } catch (error) {
      console.log("something went wrong in Postrepository level");
      throw error;
    }
  }
  async delete(id) {
    try {
      const posts = await Post.findByIdAndDelete(id);
      const answer = await Answers.deleteMany({ post_id: id });
      return posts;
    } catch (error) {
      console.log("something went wrong in Postrepository level");
      throw Error;
    }
  }

  async getById(id) {
    try {
      const { _doc } = await Post.findById(id).populate("user_id");
      const numberOfAnswers = await this.countAnswers(id);
      return { ..._doc, numberOfAnswers };
    } catch (error) {
      console.log("something went wrong in Postrepository level");
      throw error;
    }
  }

  async upvote(postId, userId) {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("Post not found.");
      }
      // Check if the user is already in the downvotes list
      if (post.downvotes !== null && post.downvotes.includes(userId)) {
        console.log("YES");
        // Add the user to the downvotes list
        post.downvotes.pull(userId);
      }
      // Check if the user is in the upvotes list
      if (post.upvotes !== null && !post.upvotes.includes(userId)) {
        console.log("No");
        // Remove the user from the upvotes list
        post.upvotes.push(userId);
      }

      await post.save();
      const upvotes = post.upvotes.length;
      const downvotes = post.downvotes.length;

      return { upvotes, downvotes };
    } catch (error) {
      console.log("something went wrong in Postrepository level");
      throw error;
    }
  }

  async downvote(postId, userId) {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error("Post not found.");
      }

      // Check if the user is in the downvotes list
      if (post.downvotes !== null && !post.downvotes?.includes(userId)) {
        // Remove the user from the downvotes list
        post.downvotes.push(userId);
      }

      // Check if the user is already in the upvotes list
      if (post.upvotes !== null && post.upvotes?.includes(userId)) {
        // Add the user to the upvotes list
        post.upvotes.pull(userId);
      }

      await post.save();

      const upvotes = post.upvotes.length;
      const downvotes = post.downvotes.length;

      return { upvotes, downvotes };
    } catch (error) {
      console.log("something went wrong in Postrepository level");
      throw error;
    }
  }

  async countAnswers(id) {
    try {
      const count = await Answers.count({ post_id: id });
      return count;
    } catch (error) {
      console.log("something went wrong in Postrepository level");
      throw error;
    }
  }
}

module.exports = PostsRepository;
