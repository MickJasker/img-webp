#!/usr/bin/env node
declare const chalk: any;
declare const clear: any;
declare const figlet: any;
declare const path: any;
declare const program: any;
declare const webp: any;
declare const fs: any;
declare class FilteredFileReader {
    private extensions;
    constructor(extensions: string[]);
    getFiles(): Promise<string[]>;
    private filterFiles;
}
declare class WebpConverter {
    private fileReader;
    constructor();
    convertImgToWebp(): Promise<void>;
}
declare const fileReader: FilteredFileReader;
