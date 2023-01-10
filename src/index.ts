import express from "express";
import routes from "./routes/server";

const app: express.Application = express();
const port = 3000;

app.listen(port as number, (): void => {
  console.log(`Hey there I'm working on http://localhost:${port}`);
});

app.use("/", routes);
