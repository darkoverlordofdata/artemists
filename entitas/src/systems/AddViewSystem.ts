module shmup {

  declare var viewContainer;

  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;
  import AddViewComponent = artemis.components.AddViewComponent;
  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import MovieClip = PIXI.extras.MovieClip;

  export class AddViewSystem extends EntityProcessingSystem {

    constructor() {
      super(Aspect.getAspectForAll(AddViewComponent));
    }

    public processEach(e:Entity) {
      var sprite = bosco.prefab(e.resource.name);
      sprite.anchor.set(0.5, 0.5);
      if (e.hasPosition) {
        var pos = e.position;
        sprite.position.set(pos.x, pos.y);
      }
      if (e.hasScale) {
        var scale = e.scale;
        sprite.scale.set(scale.x, scale.y);
      }
      if (e.hasLayer) sprite['layer'] = e.layer.ordinal;
      if (e.hasTint) sprite.tint = e.tint.rgb;

      e.addView(sprite);
      e.isAddView = false;

      /**
       * Add the sprite to PIXI
       */
      viewContainer.addChild(sprite);
      viewContainer.children.sort(function (a, b) {
        if (a['layer'] < b['layer'])
          return -1;
        if (a['layer'] > b['layer'])
          return 1;
        return 0;
      });
    }
  }
}