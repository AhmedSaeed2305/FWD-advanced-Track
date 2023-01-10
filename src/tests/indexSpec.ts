import img from "../routes/api/imgRoute";
import resizeImage from "../routes/api/imgProcessing";
import app from "../index";
import supertest from "supertest";

const request = supertest(app);

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

describe("Test endpoint responses", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
