### artemis-cli
Entitas style bolt-on

define components

    arts create -c Position x:number y:number
    ...Define Each Component
    arts generate


and start using

    protected fire(x:number, y:number) {
      this.world.createEntity("Bullet")
        .setBullet(true)
        .addResource("bullet")
        .addLayer(Layer.PARTICLES)
        .addBounds(5)
        .addTint(0xffffff)
        .addVelocity(0, -10)
        .addPosition(x, y)
        .setAddView(true)
        .start(Groups.PLAYER_BULLETS);
    }


instead of this

    @Pooled()
    export class PositionComponent extends PooledComponent {
      public static className = 'PositionComponent';
      public initialize(x, y) {
        this.x = x;
        this.y = y;
      }
      public x:number;
      public y:number;
    }
    PositionComponent.prototype.x = 0;
    PositionComponent.prototype.y = 0;
    
    ... Define Each Component
    ... Import into each system
    
    import BulletComponent = artemis.components.BulletComponent;
    import ResourceComponent = artemis.components.ResourceComponent;
    import LayerComponent = artemis.components.LayerComponent;
    import BoundsComponent = artemis.components.BoundsComponent;
    import TintComponent = artemis.components.TintComponent;
    import VelocityComponent = artemis.components.VelocityComponent;
    import PositionComponent = artemis.components.PositionComponent;
    import AddViewComponent = artemis.components.AddViewComponent;
    import GroupManager = artemis.managers.GroupManager;
    ...
  

    protected fire(x:number, y:number) {
      var e = this.world.createEntity("Bullet")
        .addComponent(BulletComponent)
        .addComponent(ResourceComponent, "bullet")
        .addComponent(LayerComponent, Layer.PARTICLES)
        .addComponent(BoundsComponent, 5)
        .addComponent(TintComponent, 0xffffff)
        .addComponent(VelocityComponent, 0, -10)
        .addComponent(PositionComponent, x, y)
        .addComponent(AddViewComponent)
        .addToWorld();
      this.world.getManager<GroupManager>(GroupManager).add(e, Groups.PLAYER_BULLETS);
    }


