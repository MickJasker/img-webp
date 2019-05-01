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

interface IWebpOptions {
  quality?: number;
  lossless?: boolean;
  lossy?: boolean;
}

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

class WebpConverter {
  private fileReader: FilteredFileReader;

  constructor() {
    this.fileReader = new FilteredFileReader(['.jpg', '.png']);
  }

  public async convertAllImgToWebp(options: IWebpOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fileReader.getFiles()
        .then(files => {
          files.forEach((file: string) => {
            let fileWOExt = file.replace(/\.[^/.]+$/, "");
            webp.cwebp(file, `${fileWOExt}.webp`, this.formatOptions(options), (status: string, err: string) => {
              if (status === '100') {
                resolve();
              } else {
                reject(err);
              }
            })
          })
        }).catch(err => {
          reject(err)
        }); 
    })
  }

  private formatOptions(options: IWebpOptions): string {
    const optionArray: string[] = [];
    if (options.quality) {
      optionArray.push(`-q ${options.quality}`)
    }
    if (options.lossless) {
      optionArray.push('-lossless');
    }
    return optionArray.join(' ')
  }
}

const converter = new WebpConverter();

converter.convertAllImgToWebp({
  quality: 1,
}).catch((err: string) => {
  console.error(chalk.red(err))
})