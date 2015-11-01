module example.systems {

  import BitmapText = PIXI.extras.BitmapText;
  import VoidEntitySystem = artemis.systems.VoidEntitySystem;
  import PositionComponent = artemis.components.PositionComponent;
  import SpriteComponent = artemis.components.SpriteComponent;


  export class HudRenderSystem extends VoidEntitySystem {
    private activeEntities:BitmapText;
    private totalCreated:BitmapText;
    private totalDeleted:BitmapText;

    private sprites:PIXI.Container;

    constructor(sprites:PIXI.Container) {
      super();
      this.sprites = sprites;
    }


    public initialize() {
      //BitmapText
      //
      var font = {font: '36px Radio Stars', align: 'left'};
      this.activeEntities = new BitmapText("Active entities:           ", font);
      this.totalCreated = new BitmapText("Total created:          ", font);
      this.totalDeleted = new BitmapText("Total deleted:          ", font);

      this.activeEntities.scale.set(0.5);
      this.totalCreated.scale.set(0.5);
      this.totalDeleted.scale.set(0.5);

      this.activeEntities.position.set(0, 20);
      this.totalCreated.position.set(0, 40);
      this.totalDeleted.position.set(0, 60);

      this.sprites.addChild(this.activeEntities);
      this.sprites.addChild(this.totalCreated);
      this.sprites.addChild(this.totalDeleted);
    }


    public processSystem() {

      this.activeEntities.text = "Active entities: " + this.world.getEntityManager().getActiveEntityCount();
      this.totalCreated.text = "Total created: " + this.world.getEntityManager().getTotalCreated();
      this.totalDeleted.text = "Total deleted: " + this.world.getEntityManager().getTotalDeleted();

    }
  }
}
