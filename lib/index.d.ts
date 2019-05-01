#!/usr/bin/env node
declare const chalk: any;
declare const clear: any;
declare const figlet: any;
declare const path: any;
declare const program: any;
declare const webp: any;
declare const fs: any;
interface IWebpOptions {
    quality?: number;
    lossless?: boolean;
    lossy?: boolean;
}
declare class FilteredFileReader {
    private extensions;
    constructor(extensions: string[]);
    getFiles(): Promise<string[]>;
    private filterFiles;
}
declare class WebpConverter {
    private fileReader;
    constructor();
    convertAllImgToWebp(options: IWebpOptions): Promise<void>;
    private formatOptions;
}
declare const converter: WebpConverter;
