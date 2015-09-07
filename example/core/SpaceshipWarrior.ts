module example.core {
  
  export class SpaceshipWarrior extends CCLayer {
  
    public gameScreen:GameScreen;
  
    /**
      * Start the menu
      * @return {cc.Scene} the menu scene
      */
    public static start(): cc.Scene {
        var scene = new cc.Scene();
        scene.addChild(new SpaceshipWarrior(scene));
        return scene;
    }
      
    /**
     *
     * @constructor
     * @extends {cc.Layer}
     * @param {cc.Scene} scene
     */
    constructor(public scene) {
        super();
        return new (cc.Layer.extend(this));
    }
 
    ctor() {
        this._super();
        this.gameScreen = new GameScreen(this);
        this.scheduleUpdate();
    }
  
    update(time:number) {
      this.gameScreen.render(time);
    }
  }
}

