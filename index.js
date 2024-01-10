const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3030;
const { miniCourseSchema } = require("./schema");
const { userModel } = require("./server/models/user.js");
const bodyParser = require("body-parser");
require("dotenv").config();
const url = process.env.DATABASE_URL;
const authRoutes = require("./server/routes/auth.js");
const userRoutes = require("./server/routes/user.js");
//Connection to data base
mongoose.connect(url);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(cors);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});
// USER ROUTES S
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server listen on http://localhost:${port}`);
});
