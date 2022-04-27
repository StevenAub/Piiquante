const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

require("./mongoose");
const app = express();

const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/user");
const stuffRoutes = require("./routes/stuff");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes

app.use("/api/auth", userRoutes);

app.use("/api/sauces", stuffRoutes);

module.exports = app;
