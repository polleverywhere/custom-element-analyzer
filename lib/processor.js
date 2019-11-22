const _ = require('lodash')

function findTag (doclets = []) {
  return _.find(doclets, 'customElement')
}

function processType (obj) {
  if (!obj) {
    return undefined
  }

  if (!obj.names) {
    return undefined
  }

  return _.flatten([obj.names]).join('|')
}

function convertJsDocTag (obj = {}, doclet = {}) {
  const tag = {
    // if name isn't available in tag, use the doclet name
    name: obj.name || doclet.name
  }

  if (obj.type) {
    tag.type = processType(obj.type)
  }

  if (obj.description) {
    tag.description = obj.description
  }

  if (obj.defaultvalue) {
    tag.defaultValue = obj.defaultvalue
  }

  if (Object.keys(obj).includes('optional')) {
    tag.required = false
  }

  return tag
}

function convertTags (jsdocTags = []) {
  return jsdocTags.reduce((accum, obj) => {
    accum.push(convertJsDocTag(obj))
    return accum
  }, [])
}

function findMembers (doclets = [], classname) {
  return _.filter(doclets, {
    kind: 'member',
  })
}

function findFunctions (doclets = []) {
  return _.filter(doclets, {
    kind: 'function',
    scope: 'global'
  })
}

function lookup (tagList, name) {
  return _.find(tagList, { name: name })
}

function addOrMergeTags (targetList, srcList, doclet) {
  srcList.forEach((tag) => {
    const existing = lookup(targetList, tag.name)
    const converted = convertJsDocTag(tag, doclet)

    if (existing) {
      // merge properties into previous while preserving original
      _.defaults(existing, converted)
    } else {
      targetList.push(converted)
    }
  })
}

function additionalDoclets (definition, doclet = {}) {
  if (doclet.attributes) {
    addOrMergeTags(definition.attributes, doclet.attributes, doclet)
  }

  if (doclet.properties) {
    addOrMergeTags(definition.properties, doclet.properties, doclet)
  }

  if (doclet.events) {
    addOrMergeTags(definition.events, doclet.events, doclet)
  }

  if (doclet.slots) {
    addOrMergeTags(definition.slots, doclet.slots, doclet)
  }

  if (doclet.cssProperties) {
    addOrMergeTags(definition.cssProperties, doclet.cssProperties, doclet)
  }
}

exports.process = function (doclets = []) {
  const definition = {
    name: '',
    description: '',
    attributes: [],
    properties: [],
    events: [],
    slots: [],
    cssProperties: []
  }

  const tag = findTag(doclets)
  if (!tag) {
    return
  }

  // class name
  const longname = tag.longname

  definition.name = tag.tagName
  definition.description = tag.classdesc
  definition.events = convertTags(tag.events)
  definition.attributes = convertTags(tag.attributes)
  definition.properties = convertTags(tag.properties)
  definition.slots = convertTags(tag.slots)
  definition.cssProperties = convertTags(tag.cssprops)

  // process members and add to definition
  findMembers(doclets).forEach((member) => {
    additionalDoclets(definition, member)
  })

  // process global functions and add to definition
  findFunctions(doclets).forEach((member) => {
    additionalDoclets(definition, member)
  })

  return definition
}
