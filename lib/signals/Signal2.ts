module artemis.signals {

  /**
   * @extends {artemis.signals.SignalBase}
   * @constructor
   */
  export class Signal2 extends artemis.signals.SignalBase {

    /**
     * dispatch the event
     * @param {Object} $1
     * @param {Object} $2
     */
    public dispatch($1, $2) {
      var node;
      this.startDispatch();
      node = this.head;
      while (node) {
        node.listener($1, $2);
        if (node.once) {
          this.remove(node.listener);
        }
        node = node.next;
      }
      return this.endDispatch();
    }
  }
}