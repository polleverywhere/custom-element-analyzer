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

function convertJsDocTag (obj = {}) {
  const tag = {
    name: obj.name || '',
  }

  if (obj.type) {
    tag.type = processType(obj.type)
  }

  if (obj.description) {
    tag.description = obj.description
  }

  if (obj.defaultvalue) {
    tag.default = obj.defaultvalue
  }

  if (obj.required) {
    tag.required = obj.required
  }

  return tag
}

function prune (jsdocTags = []) {
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

function memberProp (definition, doclet = {}) {
  if (doclet.attributes) {
    doclet.attributes.forEach((obj) => {
      definition.attributes.push(convertJsDocTag(obj))
    })
  }

  if (doclet.properties) {
    doclet.properties.forEach((obj) => {
      definition.properties.push(convertJsDocTag(obj))
    })
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
  definition.events = prune(tag.events)
  definition.attributes = prune(tag.attributes)
  definition.properties = prune(tag.properties)
  definition.slots = prune(tag.slots)
  definition.cssProperties = prune(tag.cssprops)

  const members = findMembers(doclets)

  // process members and add to definition
  members.forEach((member) => {
    memberProp(definition, member)
  })

  return definition
}
