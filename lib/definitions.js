const DEFINITIONS = {
  'attr': {
    mustHaveValue: false,
    canHaveType: true,
    canHaveName: true,
    onTagged: function (doclet, tag) {
      doclet.attributes = doclet.attributes || []
      doclet.attributes.push(tag.value)
    },
    synonyms: ['attribute']
  },
  'slot': {
    mustHaveValue: false,
    canHaveType: true,
    canHaveName: true,
    onTagged: function (doclet, tag) {
      doclet.slots = doclet.slots || []
      doclet.slots.push(tag.value)
    }
  },
  'cssprop': {
    mustHaveValue: false,
    canHaveType: true,
    canHaveName: true,
    onTagged: function (doclet, tag) {
      doclet.cssprops = doclet.cssprops || []
      doclet.cssprops.push(tag.value)
    }
  },
  'element': {
    mustHaveValue: false,
    canHaveType: false,
    canHaveName: false,
    onTagged: function (doclet, tag) {
      doclet.tagName = tag.text
      doclet.customElement = true
    }
  },
  'required': {
    mustHaveValue: false,
    canHaveName: false,
    canHaveType: false,
    onTagged: function (doclet, tag) {
      doclet.required = true
    }
  },
  'fires': {
    mustHaveValue: false,
    canHaveName: true,
    canHaveType: true,
    onTagged: function (doclet, tag) {
      doclet.events = doclet.events || []
      doclet.events.push(tag.value)
    }
  }
}

exports.defineTags = function (dictionary) {
  Object.keys(DEFINITIONS).forEach((tagName) => {
    const tagDef = DEFINITIONS[tagName]
    dictionary.defineTag(tagName, tagDef)

    if (tagDef.synonyms) {
      tagDef.synonyms.forEach((synonym) => {
        dictionary.defineSynonym(tagName, synonym)
      })
    }
  })
}
