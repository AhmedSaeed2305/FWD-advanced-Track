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
var express_1 = __importDefault(require("express"));
var imgProcessing_1 = __importDefault(require("./imgProcessing"));
var node_fs_1 = require("node:fs");
var path = __importStar(require("path"));
var img = express_1.default.Router();
var resizedImagesFolder = path.resolve("./").concat("/imgs/thumbs");
var checkImages = function (path) {
    try {
        return (0, node_fs_1.accessSync)(path);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
img.get("/", function (req, res) {
    var queryData = req.query;
    var imgDataString = "".concat(queryData.filename, "-").concat(queryData.width, "-").concat(queryData.height, ".jpg");
    if (queryData.filename &&
        queryData.width &&
        queryData.height &&
        Number(queryData.width) > 0 &&
        Number(queryData.height) > 0) {
        try {
            if (!checkImages("".concat(path.resolve("./").concat("/imgs"), "/").concat(queryData.filename, ".jpg"))) {
                try {
                    if (!checkImages("".concat(resizedImagesFolder, "/").concat(imgDataString))) {
                        res.status(200).sendFile("".concat(imgDataString), {
                            root: "".concat(resizedImagesFolder),
                        });
                    }
                }
                catch (err) {
                    (0, imgProcessing_1.default)(queryData.filename, Number(queryData.width), Number(queryData.height)).then(function (err) {
                        if (err) {
                            res
                                .status(404)
                                .send("An error occured during image resizing please try again");
                        }
                        res
                            .status(200)
                            .sendFile("".concat(queryData.filename, "-").concat(queryData.width, "-").concat(queryData.height, ".jpg"), {
                            root: "".concat(resizedImagesFolder),
                        });
                    });
                }
            }
        }
        catch (err) {
            res
                .status(404)
                .send("The file name you entered isn't availabe please enter a valid file name and try again!");
        }
    }
    else {
        res
            .status(404)
            .send("The query data is incorrect please make sure to enter proper file name, width and height values");
    }
});
exports.default = img;
