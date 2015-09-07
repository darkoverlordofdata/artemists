var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var blackboard;
    (function (blackboard) {
        var TriggerMultiCondition = (function (_super) {
            __extends(TriggerMultiCondition, _super);
            /**
             * Initializes a new instance of the SimpleTrigger class.
             *
             * @param condition The condition.
             * @param onFire  The event.
             * @param names  The names.
             */
            function TriggerMultiCondition(condition, onFire, names) {
                _super.call(this, names);
                this.condition = condition;
                this.onFire = onFire;
            }
            /**
             * Removes the this trigger.
             */
            TriggerMultiCondition.prototype.removeThisTrigger = function () {
                this.blackboard.removeTrigger(this);
            };
            /**
             * Called if is fired.
             * @param triggerStateType  State of the trigger.
             */
            TriggerMultiCondition.prototype.calledOnFire = function (triggerStateType) {
                if (this.onFire !== null) {
                    this.onFire(triggerStateType);
                }
            };
            /**
             * Checks the condition to fire.
             * @returns {boolean} if XXXX, false otherwise
             */
            TriggerMultiCondition.prototype.checkConditionToFire = function () {
                return this.condition(this.blackboard, this.triggerStateType);
            };
            return TriggerMultiCondition;
        })(blackboard.Trigger);
        blackboard.TriggerMultiCondition = TriggerMultiCondition;
    })(blackboard = artemis.blackboard || (artemis.blackboard = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=TriggerMultiCondition.js.map