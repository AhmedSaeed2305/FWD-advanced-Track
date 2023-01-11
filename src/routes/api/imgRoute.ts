// import statementss
import express from "express";
import resizeImage from "./imgProcessing";
import { accessSync } from "node:fs";
import * as path from "path";

//global variables
const img = express.Router();

const resizedImagesFolder = path.resolve("./").concat("/imgs/thumbs");

// function uses the fs accessSync method to check if the image is already exist,
// it returns undefined if the image is exist if not it throws an Error.
const checkImages = function (path: string): unknown {
  try {
    return accessSync(path);
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
};

// handling the get request method
img.get("/", (req: express.Request, res: express.Response): void => {
  // storing the query data from the URL
  const queryData = req.query;
  // storing the processed image full name as string
  const imgDataString = `${queryData.filename}-${queryData.width}-${queryData.height}.jpg`;
  // input sanitizing 
  if (
    queryData.filename &&
    queryData.width &&
    queryData.height &&
    Number(queryData.width) > 0 &&
    Number(queryData.height) > 0
  ) {
    // check if the original image requested available in the api
    try {
      if (
        !checkImages(
          `${path.resolve("./").concat("/imgs")}/${queryData.filename}.jpg`
        )
      ) {
        // check if the resized image is already exist
        try {
          if (!checkImages(`${resizedImagesFolder}/${imgDataString}`)) {
            // send the resized image without reprocessing it again
            res.status(200).sendFile(`${imgDataString}`, {
              root: `${resizedImagesFolder}`,
            });
          }
          // if the resized image isn't exist then send it to get resized and store it.
        } catch (err: unknown) {
          resizeImage(
            queryData.filename as string,
            Number(queryData.width) as number,
            Number(queryData.height) as number
          ).then(err => {
            // handle any error occurs during resizing
            if (err as Error) {
              res
                .status(404)
                .send(
                  "An error occured during image resizing please try again"
                );
            }
            // send the resized image after processing 
            res
              .status(200)
              .sendFile(
                `${queryData.filename}-${queryData.width}-${queryData.height}.jpg`,
                {
                  root: `${resizedImagesFolder}`,
                }
              );
          });
        }
      }
      // handle the error if the requested image isn't availabel
    } catch (err: unknown) {
      res
        .status(404)
        .send(
          "The image name you entered isn't availabe please enter a valid image name and try again!"
        );
    }
  } else {
    // handle the error if any of the input data isn't valid or correct
    res
      .status(404)
      .send(
        "The query data is incorrect please make sure to enter proper file name, width and height values"
      );
  }
});

// export statement
export default img;
