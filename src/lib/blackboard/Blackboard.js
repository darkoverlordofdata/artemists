var artemis;
(function (artemis) {
    var blackboard;
    (function (blackboard) {
        /**
         *
         */
        (function (TriggerStateType) {
            TriggerStateType[TriggerStateType["ValueAdded"] = 1] = "ValueAdded";
            TriggerStateType[TriggerStateType["ValueRemoved"] = 16] = "ValueRemoved";
            TriggerStateType[TriggerStateType["ValueChanged"] = 256] = "ValueChanged";
            TriggerStateType[TriggerStateType["TriggerAdded"] = 4096] = "TriggerAdded";
        })(blackboard.TriggerStateType || (blackboard.TriggerStateType = {}));
        var TriggerStateType = blackboard.TriggerStateType;
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
             *
             * @param trigger
             * @param evaluateNow
             */
            BlackBoard.prototype.addTrigger = function (trigger, evaluateNow) {
                if (evaluateNow === void 0) { evaluateNow = false; }
            };
            BlackBoard.prototype.atomicOperateOnEntry = function (operation) {
                operation(this);
            };
            BlackBoard.prototype.getEntry = function (name) {
                return this.intelligence[name];
            };
            BlackBoard.prototype.removeEntry = function (name) {
                if (this.intelligence[name])
                    delete this.intelligence[name];
            };
            BlackBoard.prototype.removeTrigger = function (trigger) {
            };
            BlackBoard.prototype.setEntry = function (name, intel) {
                this.intelligence[name] = intel;
            };
            BlackBoard.prototype.triggerList = function (name) {
                return null;
            };
            return BlackBoard;
        })();
        blackboard.BlackBoard = BlackBoard;
    })(blackboard = artemis.blackboard || (artemis.blackboard = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Blackboard.js.map