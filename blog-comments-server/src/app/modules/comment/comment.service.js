const Blog = require("../blog/blog.model");
const Comment = require("./comment.model");

const createCommentIntoDB = async (payload) => {
  const result = await Comment.create(payload);
  return result;
};

const getAllCommentsFromDB = async () => {
  const comments = await Comment.find({});
  return comments;
};

const getBlogsCommentsFromDB = async (id) => {
  const comments = await Comment.find({ blogId: id });
  return comments;
};

const commentServices = {
  createCommentIntoDB,
  getAllCommentsFromDB,
  getBlogsCommentsFromDB,
};
module.exports = commentServices;
