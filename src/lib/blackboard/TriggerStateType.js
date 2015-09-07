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
    })(blackboard = artemis.blackboard || (artemis.blackboard = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=TriggerStateType.js.map