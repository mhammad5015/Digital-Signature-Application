const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Importing Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const emailRoutes = require("./routes/emailRoutes");

// Using Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(emailRoutes);

app.listen(port, "localhost", () => console.log("listening on port " + port));
