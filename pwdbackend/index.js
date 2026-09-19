const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const cors = require("cors")
const mongoose = require("mongoose")
const app=express()
const cookieParser=require('cookie-parser')


//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Database Connected")})
.catch((err)=>console.log("Database Not Connected:", err.message))

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false})),

app.use('/',require('./routes/authRoutes'))

app.listen(5001, () => {
  console.log("Server running on port 5001");
});