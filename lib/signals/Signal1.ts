module artemis.signals {

  /**
   * @extends {artemis.signals.SignalBase}
   * @constructor
   */
  export class Signal1 extends artemis.signals.SignalBase {

    /**
     * dispatch the event
     * @param {Object} $1
     */
    public dispatch($1) {
      var node;
      this.startDispatch();
      node = this.head;
      while (node !== null) {
        node.listener($1);
        if (node.once) {
          this.remove(node.listener);
        }
        node = node.next;
      }
      return this.endDispatch();
    }
  }
}