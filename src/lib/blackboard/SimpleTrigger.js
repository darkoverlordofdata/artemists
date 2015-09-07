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
        var SimpleTrigger = (function (_super) {
            __extends(SimpleTrigger, _super);
            /**
             * Initializes a new instance of the SimpleTrigger class.
             *
             * @param name  The name.
             * @param condition The condition.
             * @param onFire  The event.
             */
            function SimpleTrigger(name, condition, onFire) {
                _super.call(this, [name]);
                this.condition = condition;
                this.onFire = onFire;
            }
            /**
             * Called if is fired.
             * @param triggerStateType  State of the trigger.
             */
            SimpleTrigger.prototype.calledOnFire = function (triggerStateType) {
                if (this.onFire !== null) {
                    this.onFire(triggerStateType);
                }
            };
            /**
             * Checks the condition to fire.
             * @returns {boolean} if XXXX, false otherwise
             */
            SimpleTrigger.prototype.checkConditionToFire = function () {
                return this.condition(this.blackboard, this.triggerStateType);
            };
            return SimpleTrigger;
        })(blackboard.Trigger);
        blackboard.SimpleTrigger = SimpleTrigger;
    })(blackboard = artemis.blackboard || (artemis.blackboard = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=SimpleTrigger.js.map