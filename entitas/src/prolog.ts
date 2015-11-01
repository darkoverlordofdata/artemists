module shmup {

  declare var viewContainer;

  export enum Layer {
    DEFAULT,
    BACKGROUND,
    TEXT,
    LIVES,
    MINES,
    ACTORS_1,
    ACTORS_2,
    ACTORS_3,
    PARTICLES,
    GUI

    // getLayerId() {
    // 	return ordinal();
    // }
  }
  export enum Groups {
    PLAYER_BULLETS  ,
    PLAYER_SHIP,
    ENEMY_SHIPS,
    ENEMY_BULLETS
  }
}