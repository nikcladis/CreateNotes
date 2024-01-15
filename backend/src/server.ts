import "dotenv/config";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const { PORT: port, MONGODB_URI: uri } = env;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  })
  .catch(console.error);
