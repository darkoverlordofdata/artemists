declare module brokenspork.components {
    import Component = artemis.Component;
    class ColorAnimation extends Component {
        static className: string;
        redMin: number;
        redMax: number;
        redSpeed: number;
        greenMin: number;
        greenMax: number;
        greenSpeed: number;
        blueMin: number;
        blueMax: number;
        blueSpeed: number;
        alphaMin: number;
        alphaMax: number;
        alphaSpeed: number;
        redAnimate: boolean;
        greenAnimate: boolean;
        blueAnimate: boolean;
        alphaAnimate: boolean;
        repeat: boolean;
    }
}
