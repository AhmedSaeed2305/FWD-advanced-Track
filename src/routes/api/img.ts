import express from "express";
import sharp from "sharp";

const img = express.Router();

const resizeImage = async function (
  filename: string,
  width: number,
  height: number
): Promise<unknown> {
  try {
    const path = `./imgs/${filename}.jpg`;
    await sharp(path)
      .resize({
        width: width,
        height: height,
        fit: "fill",
      })
      .toFile("./imgs/thumbs/fjord-resized.jpg");
  } catch (err) {
    return err;
  }
};

img.get("/", (req, res) => {
  const queryData = req.query;
  resizeImage(
    queryData.filename as string,
    Number(queryData.width) as number,
    Number(queryData.height) as number
  ).then(err => {
    if (err) {
      res.send("the image not found please enter a valid image name");
      return;
    }
    res.sendFile("fjord-resized.jpg", {
      root: "imgs/thumbs",
    });
  });
});
export { img, resizeImage };
