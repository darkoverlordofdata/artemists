module example.systems {
	
	import Health = example.components.Health;
	import Position = example.components.Position;
  import Sprite = example.components.Sprite;

	import Aspect = artemis.Aspect;
	import ComponentMapper = artemis.ComponentMapper;
	import Entity = artemis.Entity;
	import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
	import MathUtils = artemis.utils.MathUtils;
	import Mapper = artemis.annotations.Mapper;
  import Constants = example.core.Constants;

  interface ILabelBMFont {
    [key: string]: cc.LabelBMFont;
  }
	export class HealthRenderSystem extends EntityProcessingSystem {
		@Mapper(Position) pm:ComponentMapper<Position>;
		@Mapper(Health) hm:ComponentMapper<Health>;
		
    private texts:ILabelBMFont;
    private game:CCLayer;

    constructor(game:CCLayer) {
			super(Aspect.getAspectForAll(Position, Health));
      this.game = game;
      this.texts = {};
		}
		
    public inserted(e:Entity) {
      // add a text element to the sprite
      var c:Sprite = <Sprite>e.getComponentByType(Sprite);
      var b:cc.LabelBMFont = new cc.LabelBMFont('100%', "res/fonts/normal.fnt");
      b.setScale(1/2);

      this.game.addChild(b);
      this.texts[e.uuid] = b;

    }
    protected removed(e:Entity) {
      // remove the text element from the sprite
      var c:Sprite = <Sprite>e.getComponentByType(Sprite);
      this.game.removeChild(this.texts[e.uuid]);
      this.texts[e.uuid] = null;
      delete this.texts[e.uuid];
    }

		public processEach(e:Entity) {
      // update the text element on the sprite
      if (this.texts[e.uuid]) {
        var position:Position = this.pm.get(e);
        var health:Health = this.hm.get(e);
        var text:cc.LabelBMFont = this.texts[e.uuid];

        var percentage:number = Math.round(health.health / health.maximumHealth * 100);
        text.setPosition(cc.p(position.x*2, Constants.FRAME_HEIGHT - position.y));
        text.setString(`${percentage}%`);
      }
		}

	}
}
