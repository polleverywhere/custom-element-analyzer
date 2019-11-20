## Custom Element Analyzer

### What is this?

A CLI tool that generates a `custom-elements.json` file from JSDocs in js files that define vanilla custom elements.

Custom Elements JSON is a work in progress format that describes custom elements. [Learn more](https://github.com/webcomponents/custom-elements-json)

Storybook Docs support reading `custom-element.json` files directly. [Learn more](https://github.com/storybookjs/storybook/tree/next/addons/docs/web-components)

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
| @cssprop | Describes a custom css property | `


## Contributing

1. Fork this repo.
2. Modify code on a branch of that repo.
3. Generate a pull request.
