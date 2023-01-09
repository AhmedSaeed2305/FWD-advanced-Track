import express from "express";
import sharp from "sharp";
const fs = require("fs");

const img = express.Router();

const resizeImage = async function (width: number, height: number) {
  try {
    await sharp("./imgs/fjord.jpg")
      .resize({
        width: width,
        height: height,
      })
      .toFile("./imgs/thumbs/fjord-resized.jpg");
  } catch (err) {
    console.log(err);
  }
};

img.get("/", (req, res) => {
  const queryData = req.query;
  resizeImage(Number(queryData.width), Number(queryData.height)).then(
    fs.readFile(
      "./imgs/thumbs/fjord-resized.jpg",
      (err: string, data: unknown): void => {
        if (err) throw err;

        res.writeHead(200, { "content-type": "image/jpg" });
        res.end(data);
      }
    )
  );
});

export default img;
