import express from "express";

const image = express.Router();

export default image.get("/", (req, res) => {
  res.send("image route");
});
