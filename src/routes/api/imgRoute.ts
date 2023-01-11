import express from "express";
import resizeImage from "./imgProcessing";
import { accessSync } from "node:fs";
import * as path from "path";

const img = express.Router();

const resizedImagesFolder = path.resolve("./").concat("/imgs/thumbs");

const checkImages = function (path: string): unknown {
  try {
    return accessSync(path);
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
};

img.get("/", (req: express.Request, res: express.Response): void => {
  const queryData = req.query;
  const imgDataString = `${queryData.filename}-${queryData.width}-${queryData.height}.jpg`;

  if (
    queryData.filename &&
    queryData.width &&
    queryData.height &&
    Number(queryData.width) > 0 &&
    Number(queryData.height) > 0
  ) {
    try {
      if (
        !checkImages(
          `${path.resolve("./").concat("/imgs")}/${queryData.filename}.jpg`
        )
      ) {
        try {
          if (!checkImages(`${resizedImagesFolder}/${imgDataString}`)) {
            res.status(200).sendFile(`${imgDataString}`, {
              root: `${resizedImagesFolder}`,
            });
            console.log("existing image");
          }
        } catch (err: unknown) {
          resizeImage(
            queryData.filename as string,
            Number(queryData.width) as number,
            Number(queryData.height) as number
          ).then(err => {
            if (err as Error) {
              res
                .status(404)
                .send(
                  "An error occured during image resizing please try again"
                );
            }
            res
              .status(200)
              .sendFile(
                `${queryData.filename}-${queryData.width}-${queryData.height}.jpg`,
                {
                  root: `${resizedImagesFolder}`,
                }
              );
            console.log("new image");
          });
        }
      }
    } catch (err: unknown) {
      res
        .status(404)
        .send(
          "The file name you entered isn't availabe please enter a valid file name and try again!"
        );
    }
  } else {
    res
      .status(404)
      .send(
        "The query data is incorrect please make sure to enter proper file name, width and height values"
      );
  }
});
export default img;
