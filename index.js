const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// logger middleware
const logger = require('./middleware/middleware.js')
app.use(logger);
app.use(express.json());
const pathToFile = path.join(__dirname, "users.json");
const pathToFile2 = path.join(__dirname, "books.json");


app.listen(3002);