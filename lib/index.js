#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var chalk = require("chalk");
var clear = require("clear");
var figlet = require("figlet");
var path = require("path");
var program = require("commander");
var webp = require("webp-converter");
var fs = require("fs");
// program.outputHelp();
clear();
console.log(chalk.red(figlet.textSync("img >>> webp CLI", { horizontalLayout: "full" })));
program
    .version("0.1.0")
    .description("A CLI to convert regular(png/jpg) images to the webp format")
    .option("-l, --lossless", "Output will be lossless. Default is lossy")
    .option("-q, --quality <float>", "Specify the quality")
    .parse(process.argv);
var FilteredFileReader = /** @class */ (function () {
    function FilteredFileReader(extensions) {
        this.extensions = extensions;
    }
    FilteredFileReader.prototype.getFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        fs.readdir("./", function (err, files) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                var filteredFiles_1 = [];
                                _this.extensions.forEach(function (extension) {
                                    _this.filterFiles(extension, files).forEach(function (file) {
                                        filteredFiles_1.push(file);
                                    });
                                });
                                resolve(filteredFiles_1);
                            }
                        });
                    })];
            });
        });
    };
    FilteredFileReader.prototype.filterFiles = function (ext, fileArray) {
        return fileArray.filter(function (file) {
            return file.indexOf(ext) !== -1;
        });
    };
    return FilteredFileReader;
}());
var WebpConverter = /** @class */ (function () {
    function WebpConverter() {
        this.fileReader = new FilteredFileReader([".jpg", ".png"]);
    }
    WebpConverter.prototype.convertAllImgToWebp = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.fileReader
                            .getFiles()
                            .then(function (files) {
                            files.forEach(function (file) {
                                var fileWOExt = file.replace(/\.[^/.]+$/, "");
                                webp.cwebp(file, fileWOExt + ".webp", _this.formatOptions(options), function (status, err) {
                                    if (status === "100") {
                                        resolve();
                                    }
                                    else {
                                        reject(err);
                                    }
                                });
                            });
                        })
                            .catch(function (err) {
                            reject(err);
                        });
                    })];
            });
        });
    };
    WebpConverter.prototype.formatOptions = function (options) {
        var optionArray = [];
        if (options.quality) {
            optionArray.push("-q " + options.quality);
        }
        if (options.lossless) {
            optionArray.push("-lossless");
        }
        return optionArray.join(" ");
    };
    return WebpConverter;
}());
var options = {};
if (program.quality) {
    options.quality = program.quality;
}
if (program.lossless) {
    options.lossless = true;
}
if (program.quality || program.lossless) {
    var converter = new WebpConverter();
    converter
        .convertAllImgToWebp(options)
        .then(function () {
        console.log(chalk.green("Converted all images to webp images"));
    })
        .catch(function (err) {
        console.error(chalk.red(err));
    });
}
else {
    program.outputHelp();
}
