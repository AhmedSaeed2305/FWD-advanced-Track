import express from "express";
import resizeImage from "./imgProcessing";
const img = express.Router();

interface ImgData {
  name: string;
  width: number;
  height: number;
}

const resizedImages: ImgData[] = [];

img.get("/", (req: express.Request, res: express.Response): void => {
  const queryData = req.query;
  const imgData: ImgData = {
    name: queryData.filename as string,
    width: Number(queryData.width),
    height: Number(queryData.height),
  };
  if (!queryData.filename || !queryData.width || !queryData.height) {
    res.status(404).send("Error: please provide file name, width and height");
    return;
  }

  if (
    resizedImages.some(
      el =>
        el.name === queryData.filename &&
        el.width === Number(queryData.width) &&
        el.height === Number(queryData.height)
    )
  ) {
    res
      .status(200)
      .sendFile(
        `${queryData.filename}-${queryData.width}-${queryData.height}.jpg`,
        {
          root: "imgs/thumbs",
        }
      );
  } else {
    resizeImage(
      queryData.filename as string,
      Number(queryData.width) as number,
      Number(queryData.height) as number
    ).then(err => {
      if (err as string) {
        res
          .status(404)
          .send("the image not found please enter a valid image name");
        return;
      }
      res
        .status(200)
        .sendFile(
          `${queryData.filename}-${queryData.width}-${queryData.height}.jpg`,
          {
            root: "imgs/thumbs",
          }
        );

      resizedImages.push(imgData);
    });
  }
});
export default img;
