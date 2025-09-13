const mongoose = require("mongoose");

const Blog = new mongoose.Schema(
  {
    meta_title: { type: String, required: true },
    meta_keywords: { type: String, required: true },
    meta_description: { type: String, required: true },
    category: { type: String, required: true },
    page_url: { type: String, required: true },
    page_image_tag: { type: String, required: true },
    title: { type: String, required: true },
    page_content: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("BlogPages", Blog);

module.exports = BlogModel;
