declare module artemis {
    class ComponentType {
        private static INDEX;
        private index_;
        private type_;
        constructor(type: Function);
        getIndex(): number;
        toString(): string;
        private static componentTypes;
        static getTypeFor(c: Function): ComponentType;
        static getIndexFor(c: Function): number;
    }
}
