const AppResponse = require("../../utils/AppResponse");
const commentServices = require("./comment.service");

const createComment = async (req, res) => {
  try {
    const result = await commentServices.createCommentIntoDB(req.body);

    AppResponse(res, "Create comment successfully", result);
  } catch (error) {
    AppResponse(res, "Can not create comment", null);
  }
};

const getAllBlogsComments = async (req, res) => {
  try {
    const result = await commentServices.getAllCommentsFromDB();

    AppResponse(res, "All comments retrieve successfully", result);
  } catch (error) {
    AppResponse(res, "Can not get all comments", null);
  }
};

const getBlogsComments = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await commentServices.getBlogsCommentsFromDB(id);

    AppResponse(res, "Blog comments retrieve successfully", result);
  } catch (error) {
    AppResponse(res, "Can not get comments", null);
  }
};

const commentController = {
  createComment,
  getAllBlogsComments,
  getBlogsComments,
};
module.exports = commentController;
