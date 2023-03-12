require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morganBody = require("morgan-body");

const blogRoutes = require("./router/index");


app.use(bodyParser.json());
morganBody(app)
app.use(blogRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hsmss.mongodb.net/blog`,
    { useNewUrlParser: true }
  )

  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
