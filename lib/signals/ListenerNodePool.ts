/**
 * This internal class maintains a pool of deleted listener nodes for reuse by framework. This reduces
 * the overhead from object creation and garbage collection.
*/
module artemis.signals {

  import ListenerNode = artemis.signals.ListenerNode;

  /**
   * @constructor
   */
  export class ListenerNodePool {

    /** @type {artemis.signals.ListenerNodePool} */
    public tail = null;

    /** @type {artemis.signals.ListenerNodePool} */
    public cacheTail = null;

    /**
     * Get listener node
     * @return {artemis.signals.ListenerNode}
     */
    public get() {
      var node;
      if (this.tail !== null) {
        node = this.tail;
        this.tail = this.tail.previous;
        node.previous = null;
        return node;
      } else {
        return new ListenerNode();
      }
    }

    /**
     * Dispose of listener node
     * @param {artemis.signals.ListenerNode} node
     */
    public dispose(node) {
      node.listener = null;
      node.once = false;
      node.next = null;
      node.previous = this.tail;
      this.tail = node;
    }

    /**
     * Cache listener node
     * @param {artemis.signals.ListenerNode} node
     */
    public cache(node) {
      node.listener = null;
      node.previous = this.cacheTail;
      this.cacheTail = node;
    }

    /**
     * Release cache
     */
    public releaseCache() {
      var node;
      while (this.cacheTail !== null) {
        node = this.cacheTail;
        this.cacheTail = node.previous;
        node.next = null;
        node.previous = this.tail;
        this.tail = node;
      }
    }
  }
}