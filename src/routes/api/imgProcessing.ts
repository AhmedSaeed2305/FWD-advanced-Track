// import statements
import sharp from "sharp";

// resizing the image function using sharp
const resizeImage = async function (
  filename: string,
  width: number,
  height: number
): Promise<unknown> {
  // try to aquire the image from images folder and resize it
  try {
    // original image path
    const path = `./imgs/${filename}.jpg`;
    // resizing the image using the provided data from the URL query
    await sharp(path as string)
      .resize({
        width: width,
        height: height,
        fit: "fill",
      })
      // saving the resized image to the thumbs folder
      .toFile(`./imgs/thumbs/${filename}-${width}-${height}.jpg`);
    // if any error occured during the processing throw it and log it.
  } catch (err: unknown) {
    console.log(err as string);
    return err as string;
  }
};

//export statement
export default resizeImage;
