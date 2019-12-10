const program = require('commander')
const util = require('util')
const processor = require('./lib/processor')
const jsdoc = require('jsdoc-api')

function processFile (file) {
  console.log('Processing file', file)

  const doclets = jsdoc.explainSync({
    files: file,
    configure: `${__dirname}/jsdoc.config.json`,
    cache: program.cache
  })

  const tag = processor.process(doclets)

  if (program.debug) {
    console.log('File jsdoc', util.inspect(doclets, { depth: null }))
  }

  return tag
}

function analyze (files) {
  const document = {
    version: 1.2
  }

  document.tags = files.reduce((accum, file) => {
    try {
      const tag = processFile(file)
      if (tag) {
        accum.push(tag)
      }
    } catch (e) {
      console.error('Failed to process file', file, e)
    }

    return accum
  }, [])

  return document
}

module.exports = analyze
