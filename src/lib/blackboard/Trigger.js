var artemis;
(function (artemis) {
    var blackboard;
    (function (blackboard) {
        var Trigger = (function () {
            /**
             * Initializes a new instance of the Trigger class
             * @param propertyName Name of the property.
             */
            function Trigger(propertyName) {
                this.isFired = false;
                this.worldPropertiesMonitored = [].concat(propertyName);
            }
            /**
             * Removes the this trigger.
             */
            Trigger.prototype.removeThisTrigger = function () {
                this.blackboard.removeTrigger(this);
            };
            /**
             * Fires the specified trigger state.
             * @param triggerStateType
             */
            Trigger.prototype.fire = function (triggerStateType) {
                this.isFired = true;
                this.triggerStateType = triggerStateType;
                if (this.checkConditionToFire()) {
                    this.calledOnFire(triggerStateType);
                    if (this.onFire !== null) {
                        this.onFire(this);
                    }
                }
                this.isFired = false;
            };
            /**
             * Called if is fired.
             * @param triggerStateType  State of the trigger.
             */
            Trigger.prototype.calledOnFire = function (triggerStateType) { };
            /**
             * Checks the condition to fire.
             * @returns {boolean} if XXXX, false otherwise
             */
            Trigger.prototype.checkConditionToFire = function () {
                return true;
            };
            return Trigger;
        })();
        blackboard.Trigger = Trigger;
    })(blackboard = artemis.blackboard || (artemis.blackboard = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Trigger.js.map