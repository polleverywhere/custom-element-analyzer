#!/usr/bin/env node

const program = require('commander')
const jsdoc = require('jsdoc-api')
const processor = require('./lib/processor')
const util = require('util')
const glob = require('glob')
const fs = require('fs')

function processFile (file) {
  console.log('Processing file', file)

  const doclets = jsdoc.explainSync({
    files: file,
    configure: `${__dirname}/jsdoc.config.json`
  })

  const tag = processor.process(doclets)

  if (program.debug) {
    console.log('File jsdoc', util.inspect(doclets, { depth: null }))
  }

  if (tag) {
    document.tags.push(tag)
  }
}

program
  .name('custom-element-analyzer')
  .usage('[options] <directory>')
  .option('-d, --debug', 'output extra debugging and output to console instead of file')
  .option('-o, --out <file-name>', 'output file name. Defaults to custom-elements.json')
  .parse(process.argv)

if (program.debug) console.log(program.opts())

const document = {
  version: 2,
  tags: []
}

if (program.debug) {
  console.log(program.args)
}

if (program.args.length > 0) {
  path = program.args[0]
} else {
  program.help()
}

const globOpts = {}
const files = glob.sync(`${path}/**/*.js`, globOpts)

if (program.debug) {
  console.log(files)
}

files.forEach(processFile)

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
