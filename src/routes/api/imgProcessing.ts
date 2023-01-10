import sharp from "sharp";

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
      .toFile(`./imgs/thumbs/${filename}-${width}x${height}.jpg`);
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default resizeImage;
