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
// import statementss
var express_1 = __importDefault(require("express"));
var imgProcessing_1 = __importDefault(require("./imgProcessing"));
var fs = __importStar(require("node:fs"));
var path = __importStar(require("path"));
//global variables
var img = express_1.default.Router();
var resizedImagesFolder = path.resolve("./").concat("/imgs/thumbs");
// function uses the fs accessSync method to check if the image is already exist,
// it returns undefined if the image is exist if not it throws an Error.
var checkImages = function (path) {
    try {
        return fs.accessSync(path);
    }
    catch (err) {
        console.log("Image requested wasn't processed before, creating new image");
        throw err;
    }
};
// handling the get request method
img.get("/", function (req, res) {
    // storing the query data from the URL
    var queryData = req.query;
    // storing the processed image full name as string
    var imgDataString = "".concat(queryData.filename, "-").concat(queryData.width, "-").concat(queryData.height, ".jpg");
    // input sanitizing
    if (queryData.filename &&
        queryData.width &&
        queryData.height &&
        Number(queryData.width) > 0 &&
        Number(queryData.height) > 0) {
        // check if the original image requested available in the api
        try {
            if (!checkImages("".concat(path.resolve("./").concat("/imgs"), "/").concat(queryData.filename, ".jpg"))) {
                // check if the resized image is already exist
                try {
                    if (!checkImages("".concat(resizedImagesFolder, "/").concat(imgDataString))) {
                        // send the resized image without reprocessing it again
                        res.status(200).sendFile("".concat(imgDataString), {
                            root: "".concat(resizedImagesFolder),
                        });
                    }
                    // if the resized image isn't exist then send it to get resized and store it.
                }
                catch (err) {
                    (0, imgProcessing_1.default)(queryData.filename, Number(queryData.width), Number(queryData.height)).then(function (err) {
                        // Guard clause to handle any error occurs during resizing
                        if (err) {
                            res
                                .status(404)
                                .send("An error occured during image resizing please try again");
                        }
                        // send the resized image after processing
                        res
                            .status(200)
                            .sendFile("".concat(queryData.filename, "-").concat(queryData.width, "-").concat(queryData.height, ".jpg"), {
                            root: "".concat(resizedImagesFolder),
                        });
                    });
                }
            }
            // handle the error if the requested image isn't availabel
        }
        catch (err) {
            res
                .status(404)
                .send("The image name you entered isn't availabe please enter a valid image name and try again!");
        }
    }
    else {
        // handle the error if any of the input data isn't valid or correct
        res
            .status(404)
            .send("The query data is incorrect please make sure to enter proper file name, width and height values");
    }
});
// export statement
exports.default = img;
