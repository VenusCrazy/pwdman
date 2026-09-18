const express = require("express");
const dotenv = require("dotenv").config
const cors = require("cors")

const app = express();

app.use('/',require('./routes/authRoutes'))

app.listen(5000, () => {
  console.log("Server running on port 5000");
});