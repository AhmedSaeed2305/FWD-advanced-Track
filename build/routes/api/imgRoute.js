"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imgProcessing_1 = __importDefault(require("./imgProcessing"));
var img = express_1.default.Router();
var resizedImages = [];
img.get("/", function (req, res) {
    var queryData = req.query;
    var imgData = {
        name: queryData.filename,
        width: Number(queryData.width),
        height: Number(queryData.height),
    };
    if (!queryData.filename || !queryData.width || !queryData.height) {
        res.status(404).send("Error: please provide file name, width and height");
        return;
    }
    if (resizedImages.some(function (el) {
        return el.name === queryData.filename &&
            el.width === Number(queryData.width) &&
            el.height === Number(queryData.height);
    })) {
        res
            .status(200)
            .sendFile("".concat(queryData.filename, "-").concat(queryData.width, "x").concat(queryData.height, ".jpg"), {
            root: "imgs/thumbs",
        });
    }
    else {
        (0, imgProcessing_1.default)(queryData.filename, Number(queryData.width), Number(queryData.height)).then(function (err) {
            if (err) {
                res
                    .status(404)
                    .send("the image not found please enter a valid image name");
                return;
            }
            res
                .status(200)
                .sendFile("".concat(queryData.filename, "-").concat(queryData.width, "x").concat(queryData.height, ".jpg"), {
                root: "imgs/thumbs",
            });
            resizedImages.push(imgData);
        });
    }
});
exports.default = img;
