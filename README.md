## Custom Element Analyzer

### What is this?

A CLI tool that generates a `custom-elements.json` file from JSDocs in js files that define vanilla custom elements. 

This utility uses `JSDoc` under the hood to do all the parsing to maintain 100% compatibility.

Custom Elements JSON is a work in progress format that describes custom elements. [Learn more](https://github.com/webcomponents/custom-elements-json)

Storybook Docs supports reading `custom-element.json` files directly. [Learn more](https://github.com/storybookjs/storybook/tree/next/addons/docs/web-components)

### Usage

```bash
$ npx custom-element-analyzer path/to/analyze
```

Help is also available at

```bash
$ npx custom-element-analyzer -h
```

### Options

```bash
Usage: custom-element-analyzer [options] <directory>

Options:
  -d, --debug            output extra debugging and output to console instead of file
  -o, --out <file-name>  output file name. Defaults to custom-elements.json
  -h, --help             output usage information
```

### Supported tags

| Tag | Usage | Example |
|---|---|---|
| @element | Defines a custom element | `@element my-element` |
| @fires | Describes an event | `@fires {string} done - Fires a done event with a string argument` |
| @attr | Describes an attribute | `@attr {string} color=red - An attribute named `color` with a default color of red.` e.g. `<my-element color='blue'>`
| @props | Describes a property | `@prop {string} name=Untitled - Name with a default value of Untitled` | 
| @slot | Describes a custom element slot | `@slot {title} - Slot named 'title'`
| @cssprop | Describes a custom css property | `@cssprop --bg-color=#fff - Background color with a default value`

Tags that are declared more than once will merge into the previous declaration filling in only what wasn't previously there.

### Example file

```js
/**
 * @fires another-event - Event that is fired in a global method
 * @fires done=value - updates done event with a default value
 */
function name () {
}

/**
 * Here is a description of my web component with a really long description
 * that also has a line break and also some usage examples:
 *
 * `<my-element>blah blah blah</my-element>`
 *
 * @element my-element
 *
 * @fires {string} done - This element fires a done event with an string argument
 *
 * @attr {string} color
 * @attr {on|off} switch=off - The switch attribute is
 *    either the "on" or "off" value and the comment has newlines
 *
 * @prop value
 *
 * @slot - This is an unnamed slot (the default slot)
 * @slot title - This is a slot named "title"
 *
 * @cssprop --bg-color=#fff - This element has a custom css property with a default value
 */
export default class MyElement extends HTMLElement {
  /**
   * @attr {boolean} disabled - the disabled attribute
   * @attr {string} color=blue - This will merge with the definition above
   */
  static get observedAttributes () { return ['switch', 'disabled', 'color'] }

  constructor (options = {}) {
    Object.assign({
      /**
       * @prop {String} option1=value - A property can be defined here as well.
       */
      option1: 'value',
    }, options)

    /**
     * @prop {string} [value=Initial value] - Initial value
     */
    this.value = 'Initial value'

    /**
     * @attr - The current opacity
     */
    this.opacity = 0.5
  }
}
```

Will generate the following `custom-elements.json` file

```json
{
  "version": 2,
  "tags": [
    {
      "name": "my-element",
      "description": "Here is a description of my web component with a really long description\nthat also has a line break and also some usage examples:\n\n`<my-element>blah blah blah</my-element>`",
      "attributes": [
        {
          "name": "color",
          "type": "string",
          "description": "This will merge with the definition above",
          "default": "blue"
        },
        {
          "name": "switch",
          "type": "on|off",
          "description": "The switch attribute is\n   either the \"on\" or \"off\" value and the comment has newlines",
          "default": "off"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "description": "the disabled attribute"
        },
        {
          "name": "opacity",
          "description": "The current opacity"
        }
      ],
      "properties": [
        {
          "name": "value",
          "type": "string",
          "description": "Initial value",
          "default": "Initial value",
          "required": false
        },
        {
          "name": "option1",
          "type": "String",
          "description": "A property can be defined here as well.",
          "default": "value"
        }
      ],
      "events": [
        {
          "name": "done",
          "type": "string",
          "description": "This element fires a done event with an string argument",
          "default": "value"
        },
        {
          "name": "another-event",
          "description": "Event that is fired in a global method"
        }
      ],
      "slots": [
        {
          "name": "default",
          "description": "This is an unnamed slot (the default slot)"
        },
        {
          "name": "title",
          "description": "This is a slot named \"title\""
        }
      ],
      "cssProperties": [
        {
          "name": "--bg-color",
          "description": "This element has a custom css property with a default value",
          "default": "#fff"
        }
      ]
    }
  ]
}
```

## Contributing

1. Fork this repo.
2. Modify code on a branch of that repo.
3. Generate a pull request.
