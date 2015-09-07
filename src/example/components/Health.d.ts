declare module brokenspork.components {
    import Component = artemis.Component;
    class Health extends Component {
        static className: string;
        health: number;
        maximumHealth: number;
    }
}
