module example.systems {
	
	
	import HashMap = artemis.utils.HashMap;
	
	import Position = example.components.Position;
	import Sprite = example.components.Sprite;
	import Constants = example.core.Constants;
	
	import ComponentMapper = artemis.ComponentMapper;
	import VoidEntitySystem = artemis.systems.VoidEntitySystem;
	import Mapper = artemis.annotations.Mapper;

	export class HudRenderSystem extends VoidEntitySystem {
		@Mapper(Position) pm:ComponentMapper<Position>;
		@Mapper(Sprite) sm:ComponentMapper<Sprite>;
	
    private activeEntities:cc.LabelBMFont;
    private totalCreated:cc.LabelBMFont;
    private totalDeleted:cc.LabelBMFont;

    private game:CCLayer;

    constructor(game:CCLayer) {
			super();
      this.game = game;
		}
	
		
		public initialize() {
			//cc.LabelBMFont
      //
			//this.activeEntities = new cc.LabelBMFont("Active entities: ", "res/fonts/normal.fnt", 200, cc.TEXT_ALIGNMENT_LEFT);
			//this.totalCreated = new cc.LabelBMFont("Total created: ", "res/fonts/normal.fnt", 200, cc.TEXT_ALIGNMENT_LEFT);
			//this.totalDeleted = new cc.LabelBMFont("Total deleted: ", "res/fonts/normal.fnt", 200, cc.TEXT_ALIGNMENT_LEFT);
      //
      //this.activeEntities.setPosition(cc.p(80,140));
      //this.totalCreated.setPosition(cc.p(80, 160));
      //this.totalDeleted.setPosition(cc.p(80, 180));
      //
      //this.game.addChild(this.activeEntities);
      //this.game.addChild(this.totalCreated);
      //this.game.addChild(this.totalDeleted);
		}
	
		
		public processSystem() {

      //this.activeEntities.setString("Active entities: "+this.world.getEntityManager().getActiveEntityCount());
      //this.totalCreated.setString("Active entities: "+this.world.getEntityManager().getTotalCreated());
      //this.totalDeleted.setString("Active entities: "+this.world.getEntityManager().getTotalDeleted());

		}
		
		
	}
}
