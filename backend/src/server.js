//const express = require('express');

import express from "express";
import dotenv from"dotenv";
import Path from "path";

import authRoutes from "./routes/auth.js";
import messagesRoutes from "./routes/messages.js";
import { connectDB } from "./lib/db.js";


dotenv.config();

const app = express();
const ___dirname =  Path.resolve ();

const PORT = process.env.PORT || 3000;

app.use (express.json ());

app.use ("/api/auth",authRoutes);
app.use ("/api/messages",messagesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use (express.static (Path.join (___dirname, "../frontend/dist")));

  app.get ("*", (req,res)=> {
     res.sendFile (Path.join (___dirname, "../frontend/dist/index.html"));
  });
}
  

app.listen (PORT, () => {
  console.log (`Server is running on port ${PORT}`);
  connectDB ();
});