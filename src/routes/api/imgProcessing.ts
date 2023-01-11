import sharp from "sharp";

const resizeImage = async function (
  filename: string,
  width: number,
  height: number
): Promise<unknown> {
  try {
    const path = `./imgs/${filename}.jpg`;
    await sharp(path as string)
      .resize({
        width: width,
        height: height,
        fit: "fill",
      })
      .toFile(`./imgs/thumbs/${filename}-${width}-${height}.jpg`);
  } catch (err) {
    console.log(err as string);
    return err as string;
  }
};

export default resizeImage;
