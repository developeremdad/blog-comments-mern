const express = require("express");
const commentController = require("./comment.controller");
const router = express.Router();

router.post("/create-comment", commentController.createComment);
router.get("/get-all-comments/", commentController.getAllBlogsComments);
router.get("/get-comments/:id", commentController.getBlogsComments);

module.exports = router;
