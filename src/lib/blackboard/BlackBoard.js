var artemis;
(function (artemis) {
    var blackboard;
    (function (blackboard) {
        /**
         *
         */
        var BlackBoard = (function () {
            /**
             * Initializes a new instance of the BlackBoard class
             */
            function BlackBoard() {
                this.intelligence = {};
                this.triggers = {};
            }
            /**
             * Adds the trigger.
             *
             * @param trigger   The trigger.
             * @param evaluateNow if set to true [evaluate now].
             */
            BlackBoard.prototype.addTrigger = function (trigger, evaluateNow) {
                if (evaluateNow === void 0) { evaluateNow = false; }
                trigger.blackboard = this;
                for (var i in trigger.worldPropertiesMonitored) {
                    var intelName = trigger.worldPropertiesMonitored[i];
                    if (this.triggers[name]) {
                        this.triggers[name].push(trigger);
                    }
                    else {
                        this.triggers[name] = [trigger];
                    }
                }
                if (evaluateNow) {
                    if (trigger.isFired === false) {
                        trigger.fire(blackboard.TriggerStateType.TriggerAdded);
                    }
                }
            };
            /**
             * Atomics the operate on entry.
             * @param operation The operation.
             */
            BlackBoard.prototype.atomicOperateOnEntry = function (operation) {
                operation(this);
            };
            /**
             * Gets the entry.
             *
             * @param name  The name.
             * @returns {T} The specified element.
             */
            BlackBoard.prototype.getEntry = function (name) {
                return this.intelligence[name];
            };
            /**
             * Removes the entry.
             * @param name  The name.
             */
            BlackBoard.prototype.removeEntry = function (name) {
                if (this.intelligence[name]) {
                    delete this.intelligence[name];
                    if (this.triggers[name]) {
                        for (var i in this.triggers[name]) {
                            var item = this.triggers[name][i];
                            if (item.isFired === false) {
                                item.fire(blackboard.TriggerStateType.ValueRemoved);
                            }
                        }
                    }
                }
            };
            /**
             * Removes the trigger.
             * @param trigger The trigger.
             */
            BlackBoard.prototype.removeTrigger = function (trigger) {
                for (var i in trigger.worldPropertiesMonitored) {
                    var intelName = trigger.worldPropertiesMonitored[i];
                    var t = this.triggers[intelName].indexOf(trigger);
                    if (t !== -1) {
                        this.triggers[intelName].slice(t, 1);
                    }
                }
            };
            /**
             * Sets the entry.
             * @param name  The name.
             * @param intel The intel.
             */
            BlackBoard.prototype.setEntry = function (name, intel) {
                var triggerStateType = this.intelligence[name] ? blackboard.TriggerStateType.ValueChanged : blackboard.TriggerStateType.ValueAdded;
                this.intelligence[name] = intel;
                if (this.triggers[name]) {
                    for (var i in this.triggers[name]) {
                        var item = this.triggers[name][i];
                        if (item.isFired === false) {
                            item.fire(triggerStateType);
                        }
                    }
                }
            };
            /**
             * Get a list of all related triggers.]
             *
             * @param name  The name.
             * @returns {Array<Trigger>}  List of appropriated triggers.
             */
            BlackBoard.prototype.triggerList = function (name) {
                return this.triggers[name];
            };
            return BlackBoard;
        })();
        blackboard.BlackBoard = BlackBoard;
    })(blackboard = artemis.blackboard || (artemis.blackboard = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=BlackBoard.js.map