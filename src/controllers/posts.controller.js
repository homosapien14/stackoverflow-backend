const PostsService = require("../services/posts.service");

const postsService = new PostsService();
const addPost = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      body: req.body.body,
      user_id: res.locals.user_id,
    };
    const response = await postsService.createPost(data);
    return res.status(201).json({
      success: true,
      message: "Successfully post a new questions/post",
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

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await postsService.getPost(id);
    return res.status(200).json({
      success: true,
      message: "Successfully received post",
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

const getAllPosts = async (req, res) => {
  try {
    const response = await postsService.getAllPosts();
    return res.status(200).json({
      success: true,
      message: "Successfully received all posts",
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

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await postsService.deletePost(id);
    return res.status(200).json({
      success: true,
      message: "Successfully deleted post",
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
const upvotePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const response = await postsService.upvotePost(postId, res.locals.user_id);
    return res.status(200).json({
      success: true,
      message: "Successfully upvoted post",
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
const downvotePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const response = await postsService.downvotePost(
      postId,
      res.locals.user_id
    );
    return res.status(200).json({
      success: true,
      message: "Successfully downvoted post",
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
  addPost,
  deletePost,
  getAllPosts,
  getPostById,
  upvotePost,
  downvotePost,
};
