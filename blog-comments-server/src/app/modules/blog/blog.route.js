const express = require("express");
const blogControllers = require("./blog.controller");
const router = express.Router();

router.post("/create-blog", blogControllers.createBlog);
router.get("/get-blogs", blogControllers.getBlogs);
router.get("/get-blog/:id", blogControllers.getSingleBlog);
router.patch("/update-blog/:id", blogControllers.updateBlog);
router.delete("/delete-blog/:id", blogControllers.deleteBlog);

module.exports = router;
