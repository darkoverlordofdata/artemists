declare module brokenspork.components {
    import Component = artemis.Component;
    enum EFFECT {
        PEW = 0,
        ASPLODE = 1,
        SMALLASPLODE = 2,
    }
    class SoundEffect extends Component {
        static className: string;
        effect: EFFECT;
    }
}
