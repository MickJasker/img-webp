#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');
const webp = require('webp-converter');

clear();

console.log(
  chalk.red(
    figlet.textSync('img-webp CLI', { horizontalLayout: 'full' })
  )
)

webp.cwebp('input.jpg', 'output.webp', '-q 80', (status: string, error: string) => {
  console.log(status,error);

  if (status === '100') {
    console.log(
      chalk.green('Convert succes')
    )
  } else if (status === '101') {
    console.error(
      chalk.red('Failure:' + error)
    )
  }
})