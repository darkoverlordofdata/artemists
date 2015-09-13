module artemis.signals {
  
  /**
   * @extends {artemis.signals.SignalBase}
   * @constructor
   */
  export class Signal0 extends artemis.signals.SignalBase {

    /**
     * dispatch the event
     */
    public dispatch() {
      var node;
      this.startDispatch();
      node = this.head;
      while (node !== null) {
        node.listener();
        if (node.once) {
          this.remove(node.listener);
        }
        node = node.next;
      }
      return this.endDispatch();
    }
  }
}