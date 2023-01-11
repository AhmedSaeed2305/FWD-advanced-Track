//import statements
import express from "express";
import img from "./api/imgRoute";

// declearing the router using express
const routes: express.Router = express.Router();

// get method for the router
routes.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Hello there, I'm Ahmed's first local server, nice to meet you :D");
});

// defining the image route
routes.use("/api/images", img);

// export satement
export default routes;
