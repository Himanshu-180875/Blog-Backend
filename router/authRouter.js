const express = require("express");
const router = express.Router();
const {
 login,
 register,
//  deleteUser,
//  deleteAllUsers
} = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);
// router.delete("/delete/:id", deleteUser);
// router.delete("/deleteAllUsers", deleteAllUsers);

module.exports = router;
