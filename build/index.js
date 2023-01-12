"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import statements
var express_1 = __importDefault(require("express"));
var server_1 = __importDefault(require("./routes/server"));
var fs = __importStar(require("node:fs"));
// declaring the local server using express
var app = (0, express_1.default)();
// port number
var port = 3000;
// using listen method to run the local server on specific port
app.listen(port, function () {
    console.log("Hey there I'm working on http://localhost:".concat(port));
    // after the server starts, check if the thumbs folder is exist, if not create it
    if (!fs.existsSync("./imgs/thumbs")) {
        fs.mkdirSync("./imgs/thumbs", {
            recursive: true,
        });
    }
});
// defining the main route
app.use("/", server_1.default);
// export statement
exports.default = app;
