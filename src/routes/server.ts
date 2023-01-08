import express from "express";
import image from "./api/img";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Hey there I'm working on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello there, Iam Ahmed's first local server, nice to meet you :D");
});
app.use("/api/image", image);
