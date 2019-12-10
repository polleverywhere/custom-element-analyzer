const logger = require('jsdoc/util/logger')
const _ = require('lodash')
const { Syntax } = require('jsdoc/src/syntax')

function isStaticMethod (node) {
  return node.type === Syntax.MethodDefinition && node.static
}

function getReturnValue (node) {
  if (node.type === Syntax.FunctionExpression && node.body.type === Syntax.BlockStatement) {
    return _.get(node, 'body.body[0].argument.elements').map((n) => n.value)
  }
}

function mergeCommentBlock (node, attributes = []) {
  const comments = unwrap(node.comment).split('\n')

  attributes.forEach((attr) => {
    comments.push(`@attribute ${attr}`)
  })

  node.comment = comments.join('\n')
}

function unwrap(src) {
  if (!src) { return '' }

  // note: keep trailing whitespace for @examples
  // extra opening/closing stars are ignored
  // left margin is considered a star and a space
  // use the /m flag on regex to avoid having to guess what this platform's newline is
  src =
    // remove opening slash+stars
    src.replace(/^\/\*\*+/, '')
      // replace closing star slash with end-marker
      .replace(/\**\*\/$/, '\\Z')
      // remove left margin like: spaces+star or spaces+end-marker
      .replace(/^\s*(\* ?|\\Z)/gm, '')
      // remove end-marker
      .replace(/\s*\\Z$/g, '')

  return src
}

exports.astNodeVisitor = {
  visitNode: function (node, e, parser, currentSourceName) {
    if (isStaticMethod(node) && node.key.name === 'observedAttributes') {
      const attributes = getReturnValue(node.value)
      mergeCommentBlock(e, attributes)
    }
  }
}
