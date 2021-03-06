module artemis.blackboard {
  "use strict";

  interface IHashMap {
    [key: string]: any;
  }

  interface ITriggerList {
    [key: string]: Array<Trigger>;
  }

  /**
   *
   */
  export class BlackBoard {

    /** the intelligence. */
    private intelligence: IHashMap;

    /** the triggers. */
    private triggers:ITriggerList;


    /**
     * Initializes a new instance of the BlackBoard class
     */
    constructor() {
      this.intelligence = {};
      this.triggers = {};
    }

    /**
     * Adds the trigger.
     *
     * @param trigger   The trigger.
     * @param evaluateNow if set to true [evaluate now].
     */
    public addTrigger(trigger:Trigger, evaluateNow:boolean=false) {

      trigger.blackboard = this;
      for (var i in trigger.worldPropertiesMonitored) {
        var intelName:string = trigger.worldPropertiesMonitored[i];

        if (this.triggers[name]) {
          this.triggers[name].push(trigger);
        } else {
          this.triggers[name] = [trigger];
        }
      }

      if (evaluateNow) {
        if (trigger.isFired === false) {
          trigger.fire(TriggerStateType.TriggerAdded);
        }
      }
    }

    /**
     * Atomics the operate on entry.
     * @param operation The operation.
     */
    public atomicOperateOnEntry(operation:Function) {
      operation(this);
    }

    /**
     * Gets the entry.
     *
     * @param name  The name.
     * @returns {T} The specified element.
     */
    getEntry<T>(name:string):T {
      return this.intelligence[name];
    }

    /**
     * Removes the entry.
     * @param name  The name.
     */
    removeEntry(name:string) {
      if (this.intelligence[name]) {
        delete this.intelligence[name];
        if (this.triggers[name]) {
          for (var i in this.triggers[name]) {
            var item = this.triggers[name][i];
            if (item.isFired === false) {
              item.fire(TriggerStateType.ValueRemoved);
            }
          }
        }
      }
    }

    /**
     * Removes the trigger.
     * @param trigger The trigger.
     */
    removeTrigger(trigger:Trigger) {

      for (var i in trigger.worldPropertiesMonitored) {
        var intelName = trigger.worldPropertiesMonitored[i];
        var t = this.triggers[intelName].indexOf(trigger);
        if (t !== -1) {
          this.triggers[intelName].slice(t,1);
        }
      }
    }

    /**
     * Sets the entry.
     * @param name  The name.
     * @param intel The intel.
     */
    setEntry<T>(name:string, intel:T) {

      var triggerStateType:TriggerStateType = this.intelligence[name] ? TriggerStateType.ValueChanged : TriggerStateType.ValueAdded;
      this.intelligence[name] = intel;

      if (this.triggers[name]) {
        for (var i in this.triggers[name]) {
          var item:Trigger = this.triggers[name][i];
          if (item.isFired === false) {
            item.fire(triggerStateType);
          }
        }
      }
    }

    /**
     * Get a list of all related triggers.]
     *
     * @param name  The name.
     * @returns {Array<Trigger>}  List of appropriated triggers.
     */
    triggerList(name:string):Trigger[] {
      return this.triggers[name];
    }
  }
}