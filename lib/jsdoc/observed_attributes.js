const logger = require('jsdoc/util/logger')
const _ = require('lodash')
const { Syntax } = require('jsdoc/src/syntax')

function isStaticMethod (node) {
  return node.type === Syntax.MethodDefinition && node.static
}

/**
 * Find the return statement that returns an array
 */
function getArrayReturnStatement (nodes) {
  return _.find(nodes, (node) => {
    return node.type === Syntax.ReturnStatement && node.argument && node.argument.type === Syntax.ArrayExpression
  })
}

/**
 * Returns the array of values from a block statement that returns an array
 */
function getReturnValue (node) {
  if (node.type === Syntax.FunctionExpression && node.body.type === Syntax.BlockStatement) {
    const returnStatementNode = getArrayReturnStatement(node.body.body) || []
    return _.map(returnStatementNode.argument.elements, 'value')
  }
}

/**
 * Unwraps existing comment block and concatenates new comments
 */
function mergeCommentBlock (node, attributes = []) {
  const comments = unwrap(node.comment).split('\n')

  attributes.forEach((attr) => {
    comments.push(`@attribute ${attr}`)
  })

  node.comment = comments.join('\n')
}

/**
 * Copied over from https://github.com/jsdoc/jsdoc/blob/master/packages/jsdoc/lib/jsdoc/doclet.js
 */
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

/**
 * Looks for the observedAttributes getter and returns the array of attributes
 *
 * static get observedAttributes() { return ['a', 'b', 'c'] }
 */
exports.astNodeVisitor = {
  visitNode: function (node, e, parser, currentSourceName) {
    if (isStaticMethod(node) && node.kind === 'get' && node.key.name === 'observedAttributes') {
      const attributes = getReturnValue(node.value)
      mergeCommentBlock(e, attributes)
    }
  }
}
