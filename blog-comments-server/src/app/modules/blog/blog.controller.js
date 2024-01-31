const AppResponse = require("../../utils/AppResponse");
const blogServices = require("./blog.service");

const createBlog = async (req, res) => {
  try {
    const result = await blogServices.createBlogIntoDB(req.body);

    AppResponse(res, "Create blog successfully", result);
  } catch (error) {
    AppResponse(res, "Can not create blog", null);
  }
};

const getBlogs = async (req, res) => {
  try {
    const result = await blogServices.getBlogsFromDB();

    AppResponse(res, "Blogs retrieve successfully", result);
  } catch (error) {
    AppResponse(res, "Can not retrieve blogs", null);
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await blogServices.getSingleFromDB(id);

    AppResponse(res, "Blog retrieve successfully", result);
  } catch (error) {
     AppResponse(res, "Can not retrieve blog", null);
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const result = await blogServices.updateBlogInDB(id, updates);
    AppResponse(res, "Blog updated successfully", result);
  } catch (error) {
    AppResponse(res, "Could not updating blog", null);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await blogServices.deleteBlogFromDB(id);

    AppResponse(res, "Blog delete successfully", result);
  } catch (error) {
    AppResponse(res, "Can not delete blog", null);
  }
};

const blogControllers = {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  getSingleBlog,
};
module.exports = blogControllers;
