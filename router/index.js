const express = require("express");
const router = express.Router();
const blogRouter = require("./blogRouter");
const authRouter = require("./authRouter");

router.use("/api/blog", blogRouter);
router.use("/api/user", authRouter);

module.exports = router;
