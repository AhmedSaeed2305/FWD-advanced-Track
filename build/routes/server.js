"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import statements
var express_1 = __importDefault(require("express"));
var imgRoute_1 = __importDefault(require("./api/imgRoute"));
// declearing the router using express
var routes = express_1.default.Router();
// get method for the router
routes.get("/", function (req, res) {
    res.send("Hello there, I'm Ahmed's first local server, nice to meet you :D");
});
// defining the image route
routes.use("/api/images", imgRoute_1.default);
// export satement
exports.default = routes;
