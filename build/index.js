"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var server_1 = __importDefault(require("./routes/server"));
var app = (0, express_1.default)();
var port = 3000;
app.listen(port, function () {
    console.log("Hey there I'm working on http://localhost:".concat(port));
});
app.use("/", server_1.default);
exports.default = app;
