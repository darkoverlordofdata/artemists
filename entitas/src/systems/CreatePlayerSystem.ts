module shmup {

  import Layer = shmup.Layer;
  import Groups = shmup.Groups;
  import VoidEntitySystem = artemis.systems.VoidEntitySystem;

  export class CreatePlayerSystem extends VoidEntitySystem  {

    public initialize() {
      this.world.createEntity("Player")
        .setPlayer(true)
        .addResource("fighter")
        .addBounds(43)
        .addTint(0x5dff81)
        .addLayer(Layer.ACTORS_3)
        .addPosition(bosco.config.width/2, bosco.config.height-100)
        .setAddView(true)
        .start(Groups.PLAYER_SHIP);
    }
  }
}