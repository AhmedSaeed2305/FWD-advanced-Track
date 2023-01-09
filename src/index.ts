import express from "express";
import routes from "./routes/server";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Hey there I'm working on http://localhost:${port}`);
});

app.use("/", routes);
