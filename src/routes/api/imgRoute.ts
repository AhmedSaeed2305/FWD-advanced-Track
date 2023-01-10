import express from "express";
import resizeImage from "./imgProcessing";
const img = express.Router();

interface ImgData {
  name: string;
  width: number;
  height: number;
}

const resizedImages: ImgData[] = [];

img.get("/", (req, res) => {
  const queryData = req.query;
  const imgData: ImgData = {
    name: queryData.filename as string,
    width: Number(queryData.width),
    height: Number(queryData.height),
  };

  if(!resizedImages.some(el =>
    el.width === Number(queryData.width) && el.height === Number(queryData.height)
  ))
   {
    resizeImage(
      queryData.filename as string,
      Number(queryData.width) as number,
      Number(queryData.height) as number
    ).then(err => {
      if (err) {
        res.send("the image not found please enter a valid image name");
        return;
      }
      res.sendFile(
        `${queryData.filename}-${queryData.width}x${queryData.height}.jpg`,
        {
          root: "imgs/thumbs",
        }
      );
    });
    resizedImages.push(imgData);
  } else {
    res.sendFile(
      `${queryData.filename}-${queryData.width}x${queryData.height}.jpg`,
      {
        root: "imgs/thumbs",
      }
    );
  }
});
export default img;
