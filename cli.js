#!/usr/bin/env node

const program = require('commander')
const glob = require('glob')
const fs = require('fs')
const util = require('util')
const analyze = require('./index')

program
  .name('custom-element-analyzer')
  .usage('[options] <directory or file> ...')
  .option('-d, --debug', 'output extra debugging and output to console instead of file')
  .option('-o, --out <file-name>', 'output file name. Defaults to custom-elements.json')
  .option('-n, --no-cache', 'disable jsdoc caching')
  .parse(process.argv)

if (program.debug) console.log(program.opts())

if (program.debug) {
  console.log(program.args)
}

const files = []

if (program.args.length > 0) {
  program.args.forEach((token) => {
    if (fs.lstatSync(token).isFile()) {
      files.push(token)
    } else {
      // glob the path
      const filesFound = glob.sync(`${token}/**/*.js`)
      files.splice(files.length, 0, ...filesFound)
    }
  })
} else {
  program.help()
}

if (program.debug) {
  console.log('Found files', files)
}

const document = analyze(files)
const json = JSON.stringify(document, null, 2)

if (program.debug) {
  console.log('Output', json)
} else {
  const outFile = program.out || 'custom-elements.json'
  try {
    fs.writeFileSync(outFile, json)
    console.log(`Finished writing file ${outFile}`)
  } catch (e) {
    console.error(err)
  }
}
