/**
 * A node in the list of listeners in a signal.
*/

module artemis.signals {

  /**
   * @constructor
  */
  export class ListenerNode {

    /** @param {artemis.signals.ListenerNode} */
    public previous = null;

    /** @param {artemis.signals.ListenerNode}*/
    public next = null;

    /** @param {artemis.signals.SignalBase} */
    public listener = null;

    /** @param {boolean} */
    public once = false;
  }
}
