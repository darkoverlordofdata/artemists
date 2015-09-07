declare module brokenspork.components {
    import Component = artemis.Component;
    class ScaleAnimation extends Component {
        static className: string;
        min: number;
        max: number;
        speed: number;
        repeat: boolean;
        active: boolean;
    }
}
