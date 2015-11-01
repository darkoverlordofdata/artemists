module example.systems {
	

	import Aspect = artemis.Aspect;
	import Entity = artemis.Entity;
	import MathUtils = artemis.utils.MathUtils;
  import Constants = example.core.Constants;
  import BitmapText = PIXI.extras.BitmapText;
  import HealthComponent = artemis.components.HealthComponent;
  import PositionComponent = artemis.components.PositionComponent;
  import SpriteComponent = artemis.components.SpriteComponent;
  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;

  interface ILabelBMFont {
    [key: string]: BitmapText;
  }
	export class HealthRenderSystem extends EntityProcessingSystem {
    private texts:ILabelBMFont;
    private sprites:PIXI.Container;

    constructor(sprites:PIXI.Container) {
			super(Aspect.getAspectForAll(PositionComponent, HealthComponent));
      this.sprites = sprites;
      this.texts = {};
		}
		
    public inserted(e:Entity) {
      // add a text element to the sprite
      var b:BitmapText = new BitmapText('100%', {font: '20px Radio Stars', align: 'left'});
      b.scale.set(1/2, 1/2);

      this.sprites.addChild(b);
      this.texts[e.uuid] = b;

    }
    protected removed(e:Entity) {
      // remove the text element from the sprite
      this.sprites.removeChild(this.texts[e.uuid]);
      this.texts[e.uuid] = null;
      delete this.texts[e.uuid];
    }

		public processEach(e:Entity) {
      // update the text element on the sprite
      if (this.texts[e.uuid]) {
        var position:PositionComponent = e.position;
        var health:HealthComponent = e.health;
        var text:BitmapText = this.texts[e.uuid];

        var percentage:number = Math.round(health.health / health.maximumHealth * 100);
        text.position.set(position.x, position.y);
        text.text = `${percentage}%`;
      }
		}

	}
}
