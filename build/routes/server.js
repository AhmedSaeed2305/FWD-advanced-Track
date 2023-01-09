"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var img_1 = require("./api/img");
var routes = express_1.default.Router();
routes.get("/", function (req, res) {
    res.send("Hello there, I'm Ahmed's first local server, nice to meet you :D");
});
routes.use("/api/images", img_1.img);
exports.default = routes;
