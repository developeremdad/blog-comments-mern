const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    userId: {
      type: Number,
    },
    id: {
      type: Number,
      unique: true,
      default: () => Math.floor(Math.random() * 100000) + 1,
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    body: {
      type: String,
      required: [true, "body is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

blogSchema.pre("save", async function (next) {
  const blog = this;
  blog.userId = Math.floor(Math.random() * 10000) + 1;
  next();
});

const Blog = model("Blog", blogSchema);
module.exports = Blog;
