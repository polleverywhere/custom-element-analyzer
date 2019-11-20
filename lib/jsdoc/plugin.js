const tagDefinitions = require('./tag_definitions')

exports.defineTags = function (dictionary) {
  Object.keys(tagDefinitions).forEach((tagName) => {
    const tagDef = tagDefinitions[tagName]
    dictionary.defineTag(tagName, tagDef)

    if (tagDef.synonyms) {
      tagDef.synonyms.forEach((synonym) => {
        dictionary.defineSynonym(tagName, synonym)
      })
    }
  })
}
