import express from "express";
import resizeImage from "./imgProcessing";
const img = express.Router();


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
    res.sendFile(`${queryData.filename}-${queryData.width}x${queryData.height}.jpg`, {
      root: "imgs/thumbs",
    });
    
  });
});
export default img;
