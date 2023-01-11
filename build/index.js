"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import statements
var express_1 = __importDefault(require("express"));
var server_1 = __importDefault(require("./routes/server"));
// declaring the local server using express
var app = (0, express_1.default)();
// port number
var port = 3000;
// using listen method to run the local server on specific port
app.listen(port, function () {
    console.log("Hey there I'm working on http://localhost:".concat(port));
});
// defining the main route
app.use("/", server_1.default);
// export statement
exports.default = app;
