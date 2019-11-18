/**
 * @fires helo
 */
function name () {

}

/**
 * Here is a description of my web component.
 * 
 * @element my-element
 * 
 * @fires change - This jsdoc tag makes it possible to document events.
 * @fires submit
 * 
 * @attr {Boolean} disabled=false - This jsdoc tag documents an attribute.
 * @attr {on|off} switch - Here is an attribute with
 *    either the "on" or "off" value and the comment has newlines
 * @attribute my-attr
 * 
 * @prop value
 * 
 * @slot - This is an unnamed slot (the default slot)
 * @slot start - This is a slot named "start".
 * @slot end
 * 
 * @cssprop --main-bg-color - This jsdoc tag can be used to document css custom properties.
 * @cssprop --main-color
 */
class MyElement extends HTMLElement {
  static get observedAttributes () { return ['disabled', 'color'] }

  constructor (options = {}) {
    Object.assign({
      /**
       * @prop {String} option1 - some option
       */
      option1: 'value'
    }, options)
  }
  /**
   * This is a description of a property with an attribute with exactly the same name: "color".
   * @type {"red"|"green"|"blue"}
   * @required
   * @attr
   */
  color = "red";
}
