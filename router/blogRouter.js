const express = require("express");
const router = express.Router();
const {
  createBlogs,
  getBlogs,
  getAllBlogs,
  updateBlog,
  deleteAllBlogs,
  deleteBlog,
} = require("../controllers/blog");

router.get("/getBlogs", getBlogs);
router.get("/getAllBlogs", getAllBlogs);
router.post("/create", createBlogs);
router.patch("/updateBlog/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);
router.delete("/deleteAllBlogs", deleteAllBlogs);

module.exports = router;
