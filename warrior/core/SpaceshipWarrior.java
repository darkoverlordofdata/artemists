package net.brokenspork.core;

import com.badlogic.gdx.Game;

public class SpaceshipWarrior extends Game {

    GameScreen gameScreen;

    @Override
    public void create() {
        this.gameScreen = new GameScreen(this);
        setScreen(gameScreen);
    }

}
