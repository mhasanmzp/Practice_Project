const mongoose = require('mongoose')
const express = require('express')
module.exports = (app)=>{

    mongoose
    .connect(
      "mongodb+srv://hellorajubhaiya:Ammu7860@clustertuba.wx8jb.mongodb.net/Practice?retryWrites=true&w=majority&appName=ClusterTuba",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("MongoDB connection successful");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });}