#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');
const webp = require('webp-converter');
const fs = require('fs');

clear();

console.log(
  chalk.red(
    figlet.textSync('img-webp CLI', { horizontalLayout: 'full' })
  )
);

class FilteredFileReader {
  private extensions: string[];

  constructor(extensions: string[]) {
    this.extensions = extensions;
  }

  public async getFiles(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir('./', (err: string, files: any) => {
        if (err) {
          reject(err);
        } else {
          const filteredFiles: string[] = [];
          this.extensions.forEach((extension: string) => {
            this.filterFiles(extension, files).forEach((file: string) => {
              filteredFiles.push(file);
            })
          })
          resolve(filteredFiles);
        }
      });
    })
  }

  private filterFiles(ext: string, fileArray: any): string[] {
    return fileArray.filter((file: string) => {
      return file.indexOf(ext) !== -1;
    })
  }
}


const fileReader = new FilteredFileReader(['.png', '.jpg']);

fileReader.getFiles().then((resp: string[]) => {
  console.log(resp);
}).catch((err: string) => {
  console.error(err)
})