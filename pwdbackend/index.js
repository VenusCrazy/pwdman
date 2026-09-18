const express = require("express");
require("dotenv").config();
const cors = require("cors")
const mongoose = require("mongoose")
const app=express()
//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Database Connected")})
.catch((err)=>console.log("Database Not Connected:", err.message))

//middleware
app.use(express.json());

app.use('/',require('./routes/authRoutes'))

app.listen(5001, () => {
  console.log("Server running on port 5001");
});