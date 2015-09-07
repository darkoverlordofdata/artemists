declare module brokenspork.components {
    import Component = artemis.Component;
    enum Layer {
        DEFAULT = 0,
        BACKGROUND = 1,
        ACTORS_1 = 2,
        ACTORS_2 = 3,
        ACTORS_3 = 4,
        PARTICLES = 5,
    }
    class Sprite extends Component {
        static className: string;
        layer: Layer;
        name_: string;
        scaleX_: number;
        scaleY_: number;
        rotation_: number;
        r_: number;
        g_: number;
        b_: number;
        a_: number;
        sprite_: cc.Sprite;
        constructor();
        name: string;
        scaleX: number;
        scaleY: number;
        rotation: number;
        r: number;
        g: number;
        b: number;
        a: number;
        addTo(layer: CCLayer): void;
        removeFrom(layer: CCLayer): void;
    }
}
