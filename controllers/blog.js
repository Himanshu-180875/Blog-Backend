const BlogPost = require("../models/blogSchema");

const createBlogs = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const exists = await BlogPost.findOne({ title, author });
    if (exists == null) {
      const userId = req.user.userId;
      const blogPost = new BlogPost({ title, content, author, userId });
      await blogPost.save();
      res.status(200).send(blogPost);
    } else {
      res.status(400).send({ message: "Blog with same title already exists" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await BlogPost.find({});
    const count = await BlogPost.countDocuments({});

    res.status(200).send({ "no. of records": count, data: allBlogs });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getBlogs = async (req, res) => {
  if (req.body.hasOwnProperty("title") && Object.keys(req.body).length === 1) {
    const { title } = req.body;
    const blogs = await BlogPost.find({ title });
    if (blogs == null) {
      res
        .status(404)
        .send({ message: `Blogs with the title ${title} not found` });
    } else if (typeof blogs === "object") {
      const count = await BlogPost.countDocuments({ title });
      res.status(200).send({ "no. of records": count, data: blogs });
    }
  } else if (
    req.body.hasOwnProperty("author") &&
    Object.keys(req.body).length === 1
  ) {
    const { author } = req.body;
    const blogs = await BlogPost.find({ author });
    if (blogs == null) {
      res
        .status(404)
        .send({ message: `Blogs with the author ${author} not found` });
    } else if (typeof blogs === "object") {
      const count = await BlogPost.countDocuments({ author });
      res.status(200).send({ "no. of records": count, data: blogs });
    }
  } else if (
    req.body.hasOwnProperty("title") &&
    req.body.hasOwnProperty("author")
  ) {
    const { title, author } = req.body;
    const blog = await BlogPost.findOne({ title, author });
    if (blog == null) {
      res.status(404).send({ message: "Blog not found" });
    } else if (typeof blog === "object") {
      res.status(200).send({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      });
    }
  }
};

const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const dataToUpdate = req.body;
    const exists = await BlogPost.find({ _id: id });
    if (exists.length == 0) {
      res.status(404).send({ message: "Blog not found" });
    } else {
      const id  = (exists[0].userId).toString()
      if (id != req.user.userId) {
       return res.status(400).send({ error: "You can't edit this Blog" });
      }
      await BlogPost.updateOne({ _id: id }, { $set: dataToUpdate });
      res.status(200).send({ message: "Record Updated Successfully" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const exists = await BlogPost.find({ _id: id });
    if (exists.length == 0) {
      res.status(404).send({ message: "Blog not found" });
    } else {
      await BlogPost.findOneAndDelete({ _id: id });
      res.status(200).send({ message: "Blog deleted successfully" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const deleteAllBlogs = async (req, res) => {
  try {
    await BlogPost.deleteMany({});
    res.status(200).send({ message: "Records deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createBlogs,
  deleteBlog,
  getBlogs,
  updateBlog,
  getAllBlogs,
  deleteAllBlogs,
};
