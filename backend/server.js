//require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log("Middleware Executed");
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  next();
});

// routes
//app.use("/admin");

// DB connection
async function startServer() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Portfolio");

    console.log("Connected to Database");

    app.listen(4000, () => {
      console.log(`Listening on PORT 4000`);
    });
  } catch (error) {
    console.error(`An Error Occurred, ${error}`);
  }
}
startServer();
