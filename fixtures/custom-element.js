/**
 * @fires helo
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
 * @attr {string} color=red - The color attribute has a default value of red
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
   */
  static get observedAttributes () { return ['switch', 'disabled', 'color'] }

  constructor (options = {}) {
    Object.assign({
      /**
       * @prop {String} option1=value - A property can be defined here as well.
       */
      option1: 'value',
    }, options)
  }
}
