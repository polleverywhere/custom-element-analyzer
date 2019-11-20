const tagDefinitions = {
  'attr': {
    mustHaveValue: false,
    canHaveType: true,
    canHaveName: true,
    onTagged: function (doclet, tag) {
      doclet.attributes = doclet.attributes || []
      doclet.attributes.push(tag.value || {})
    },
    synonyms: ['attribute']
  },
  'slot': {
    mustHaveValue: false,
    canHaveType: true,
    canHaveName: true,
    onTagged: function (doclet, tag) {
      doclet.slots = doclet.slots || []

      // if slot doesn't have a name assume it is default
      if (tag.value && !tag.value.name) {
        tag.value.name = 'default'
      }

      doclet.slots.push(tag.value || {})
    }
  },
  'cssprop': {
    mustHaveValue: false,
    canHaveType: true,
    canHaveName: true,
    onTagged: function (doclet, tag) {
      doclet.cssprops = doclet.cssprops || []
      doclet.cssprops.push(tag.value || {})
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
  'fires': {
    mustHaveValue: false,
    canHaveName: true,
    canHaveType: true,
    onTagged: function (doclet, tag) {
      doclet.events = doclet.events || []
      doclet.events.push(tag.value || {})
    }
  }
}

module.exports = tagDefinitions
