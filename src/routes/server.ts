import express from "express";
import img from "./api/imgRoute";

const routes: express.Router = express.Router();

routes.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Hello there, I'm Ahmed's first local server, nice to meet you :D");
});

routes.use("/api/images", img);

export default routes;
