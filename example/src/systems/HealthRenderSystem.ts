module example.systems {
	

	import Aspect = artemis.Aspect;
	import Entity = artemis.Entity;
	import MathUtils = artemis.utils.MathUtils;
  import Constants = example.core.Constants;
  import BitmapText = PIXI.extras.BitmapText;
  import EntitySystem = artemis.EntitySystem;
  import HealthComponent = artemis.components.HealthComponent;
  import PositionComponent = artemis.components.PositionComponent;
  import SpriteComponent = artemis.components.SpriteComponent;
  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;

  import Container = PIXI.Container;

  interface ILabelBMFont {
    [key: string]: BitmapText;
  }
	export class HealthRenderSystem extends EntityProcessingSystem {
    private texts:ILabelBMFont;

    constructor() {
			super(Aspect.getAspectForAll(PositionComponent, HealthComponent));
      this.texts = {};
		}
		
    public inserted(e:Entity) {
      // add a text element to the sprite
      var b:BitmapText = new BitmapText('100%', {font: '20px Radio Stars', align: 'left'});
      b.scale.set(1/2, 1/2);

      bosco.viewContainer.addChild(b);
      this.texts[e.uuid] = b;

    }
    protected removed(e:Entity) {
      // remove the text element from the sprite
      bosco.viewContainer.removeChild(this.texts[e.uuid]);
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
