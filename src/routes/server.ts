import express from "express";
import img from "./api/img";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Hello there, Iam Ahmed's first local server, nice to meet you :D");
});

routes.use("/image", img);

export default routes;
