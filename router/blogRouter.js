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
const {verifyToken} = require('../middlewares/verifyToken');

router.get("/getBlogs", getBlogs);
router.get("/getAllBlogs", getAllBlogs);
router.post("/create", verifyToken, createBlogs);
router.patch("/updateBlog/:id", verifyToken,  updateBlog);
router.delete("/delete/:id", deleteBlog);
router.delete("/deleteAllBlogs", deleteAllBlogs);

module.exports = router;
