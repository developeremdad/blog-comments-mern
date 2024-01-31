const Blog = require("./blog.model");

const createBlogIntoDB = async (payload) => {
  const result = await Blog.create(payload);
  return result;
};

const getBlogsFromDB = async () => {
  const result = await Blog.find({}).sort("-createdAt");
  return result;
};

const getSingleFromDB = async (id) => {
  const result = await Blog.findOne({id});
  return result;
};

const updateBlogInDB = async (id, payload) => {
  const result = await Blog.updateOne({id}, { $set: payload }, { new: true });
  return result;
};

const deleteBlogFromDB = async (id) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const blogServices = {
  createBlogIntoDB,
  getBlogsFromDB,
  deleteBlogFromDB,
  updateBlogInDB,
  getSingleFromDB,
};
module.exports = blogServices;
