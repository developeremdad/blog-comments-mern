const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    blogId: {
      type: Number,
      required: [true, "blog id is required"],
    },
    id: {
      type: Number,
      default: () => Math.floor(Math.random() * 100000) + 1,
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    body: {
      type: String,
      required: [true, "body is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);
module.exports = Comment;
