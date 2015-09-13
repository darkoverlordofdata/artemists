module artemis.signals {

  /**
   * @extends {artemis.signals.SignalBase}
   * @constructor
   */
  export class Signal3 extends artemis.signals.SignalBase {

    /**
     * dispatch the event
     * @param {Object} $1
     * @param {Object} $2
     * @param {Object} $3
     */
    public dispatch($1, $2, $3) {
      var node;
      this.startDispatch();
      node = this.head;
      while (node !== null) {
        node.listener($1, $2, $3);
        if (node.once) {
          this.remove(node.listener);
        }
        node = node.next;
      }
      return this.endDispatch();
    }
  }
}