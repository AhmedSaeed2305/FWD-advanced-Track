import express from "express";
import sharp from "sharp";
const fs = require("fs");

const img = express.Router();

img.get("/", (req, res) => {
  fs.readFile('./imgs/fjord.jpg', function(err: string, data: string): void {
    if (err) throw err;

    res.writeHead(200, {'Content-Type': 'image/jpg'})
    res.end(data) 
  });
});

export default img;
