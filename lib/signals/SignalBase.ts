module artemis.signals {

  import ListenerNodePool = artemis.signals.ListenerNodePool;

  export class SignalBase {

    /** @type {artemis.signals.ListenerNode} */
    public head = null;

    /** @type {artemis.signals.ListenerNode} */
    public tail = null;

    /** @type {number} */
    public numListeners = 0;

    /** @type {Array<Object>} */
    public keys = null;

    /** @type {artemis.signals.ListenerNode} */
    public nodes = null;

    /** @type {artemis.signals.ListenerNodePool} */
    public listenerNodePool = null;

    /** @type {artemis.signals.ListenerNode} */
    public toAddHead = null;

    /** @type {artemis.signals.ListenerNode} */
    public toAddTail = null;

    /** @type {boolean} */
    public dispatching = false;

    /**
     * @constructor
     */
    constructor() {
      this.nodes = [];
      this.keys = [];
      this.listenerNodePool = new ListenerNodePool();
      this.numListeners = 0;
    }

    /**
     */
    public startDispatch() {
      this.dispatching = true;  // Void
    }

    /**
     */
    public endDispatch() {
      this.dispatching = false;
      if (this.toAddHead) {
        if (!this.head) {
          this.head = this.toAddHead;
          this.tail = this.toAddTail;
        } else {
          this.tail.next = this.toAddHead;
          this.toAddHead.previous = this.tail;
          this.tail = this.toAddTail;
        }

        this.toAddHead = null;
        this.toAddTail = null;
      }

      this.listenerNodePool.releaseCache();  // Void
    }

    /**
     * @param {Object} listener
     */
    public getNode(listener) {
      var node;
      node = this.head;
      while (node !== null) {
        if (node.listener === listener) {
          break;
        }
        node = node.next;
      }

      if (node === null) {
        node = this.toAddHead;
        while (node !== null) {
          if (node.listener === listener) {
            break;
          }
          node = node.next;
        }
      }

      return node;
    }

    /**
     * @param {Object} listener
     */
    public add(listener) {
      var node;
      if (this.keys.indexOf(listener) !== -1) {
        return;
      }

      node = this.listenerNodePool.get();
      node.listener = listener;
      this.nodes.push(node);
      this.keys.push(listener);
      this.addNode(node);  // Void
    }

    /**
     * @param {Object} listener
     */
    public addOnce(listener) {
      var node;
      if (this.keys.indexOf(listener) !== -1) {
        return;
      }

      node = this.listenerNodePool.get();
      node.listener = listener;
      node.once = true;
      this.nodes.push(node);
      this.keys.push(listener);
      this.addNode(node);  // Void
    }

    /**
     * @param {artemis.signals.ListenerNode} node
     */
    public addNode(node) {
      if (this.dispatching) {
        if (this.toAddHead === null) {
          this.toAddHead = this.toAddTail = node;
        } else {
          this.toAddTail.next = node;
          node.previous = this.toAddTail;
          this.toAddTail = node;
        }
      } else {
        if (this.head === null) {
          this.head = this.tail = node;
        } else {
          this.tail.next = node;
          node.previous = this.tail;
          this.tail = node;
        }
      }

      this.numListeners++;  // Void
    }

    /**
     * @param {Object} listener
     */
    public remove(listener) {
      var index, node;
      index = this.keys.indexOf(listener);
      node = this.nodes[index];
      if (node) {
        if (this.head === node) {
          this.head = this.head.next;
        }
        if (this.tail === node) {
          this.tail = this.tail.previous;
        }
        if (this.toAddHead === node) {
          this.toAddHead = this.toAddHead.next;
        }
        if (this.toAddTail === node) {
          this.toAddTail = this.toAddTail.previous;
        }
        if (node.previous) {
          node.previous.next = node.next;
        }
        if (node.next) {
          node.next.previous = node.previous;
        }

        this.nodes.splice(index, 1);
        this.keys.splice(index, 1);

        if (this.dispatching) {
          this.listenerNodePool.cache(node);
        } else {
          this.listenerNodePool.dispose(node);
        }

        this.numListeners--;  // Void
      }
    }

    /**
     */
    public removeAll() {
      var index, node;
      while (this.head) {
        node = this.head;
        this.head = this.head.next;
        index = this.keys.indexOf(node.listener);
        this.nodes.splice(index, 1);
        this.listenerNodePool.dispose(node);
      }

      this.nodes = [];
      this.keys = [];
      this.tail = null;
      this.toAddHead = null;
      this.toAddTail = null;
      this.numListeners = 0;  // Void
    }
  }
}