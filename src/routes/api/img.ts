import express from "express";

const img = express.Router();


img.get("/", (req, res) => {
  res.send("Image route");
});

export default img;