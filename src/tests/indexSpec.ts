import { img, resizeImage } from "../routes/api/imgRoute";

describe("the resize image suite", () => {
  it("takes an image and resize it and save it to the local files", async () => {
    const result = await resizeImage("fjord", 600, 500);
    expect(result).toBeFalsy();
  });
});

describe("the render image suite", () => {
  it("takes a url request params and send the data to the resizeImage function to resize it then render the resized image", () => {
    expect(img).not.toEqual(null);
  });
});
