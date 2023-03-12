const express = require("express");
const router = express.Router();
const blogRouter = require("./blogRouter");

router.use("/api/blog", blogRouter);

module.exports = router;
