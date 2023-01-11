// import statements
import express from "express";
import routes from "./routes/server";

// declaring the local server using express
const app: express.Application = express();
// port number
const port = 3000;

// using listen method to run the local server on specific port
app.listen(port as number, (): void => {
  console.log(`Hey there I'm working on http://localhost:${port}`);
});

// defining the main route
app.use("/", routes);

// export statement
export default app;
