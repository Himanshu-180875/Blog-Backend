const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type: String,
      required: true
    }
    // password: {
    //   type: String,
    //   required: true,
    //   validate: [
    //     function (password) {
    //       return password === this.confirmPassword;
    //     },
    //     "Passwords do not match",
    //   ],
    // },
    // confirmPassword: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
