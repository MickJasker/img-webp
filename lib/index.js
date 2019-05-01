#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var figlet_1 = __importDefault(require("figlet"));
var commander_1 = __importDefault(require("commander"));
clear_1.default();
console.log(chalk_1.default.red(figlet_1.default.textSynch('img-webp', { horizontalLayout: 'full' })));
commander_1.default
    .version('0.1.0')
    .description('A tool to convert regular(png/jpg) to the webp format')
    .option('-b', 'banana', 'Do a flip');
