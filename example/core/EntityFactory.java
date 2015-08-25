package net.brokenspork.core;

import net.brokenspork.components.Bounds;
import net.brokenspork.components.ColorAnimation;
import net.brokenspork.components.Expires;
import net.brokenspork.components.Health;
import net.brokenspork.components.ParallaxStar;
import net.brokenspork.components.Player;
import net.brokenspork.components.Position;
import net.brokenspork.components.ScaleAnimation;
import net.brokenspork.components.SoundEffect;
import net.brokenspork.components.Sprite;
import net.brokenspork.components.Velocity;
import net.brokenspork.components.SoundEffect.EFFECT;

import com.artemis.Entity;
import com.artemis.World;
import com.artemis.managers.GroupManager;
import com.badlogic.gdx.math.MathUtils;

public class EntityFactory {
	
	public static Entity createPlayer(World world, float x, float y) {
		Entity e = world.createEntity();
		
		Position position = new Position();
		position.x = x;
		position.y = y;
		e.addComponent(position);
		
		Sprite sprite = new Sprite();
		sprite.name = "fighter";
		sprite.r = 93/255f;
		sprite.g = 255/255f;
		sprite.b = 129/255f;
		sprite.layer = Sprite.Layer.ACTORS_3;
		e.addComponent(sprite);
		
		Velocity velocity = new Velocity();
		velocity.vectorX = 0;
		velocity.vectorY = 0;
		e.addComponent(velocity);
		
		Bounds bounds = new Bounds();
		bounds.radius = 43;
		e.addComponent(bounds);
		
		e.addComponent(new Player());
		
		world.getManager(GroupManager.class).add(e, Constants.Groups.PLAYER_SHIP);
		
		return e;
	}
	
	public static Entity createPlayerBullet(World world, float x, float y) {
		Entity e = world.createEntity();
		
		Position position = new Position();
		position.x = x;
		position.y = y;
		e.addComponent(position);
		
		Sprite sprite = new Sprite();
		sprite.name = "bullet";
		sprite.layer = Sprite.Layer.PARTICLES;
		e.addComponent(sprite);
		
		Velocity velocity = new Velocity();
		velocity.vectorY = 800;
		e.addComponent(velocity);
		
		Bounds bounds = new Bounds();
		bounds.radius = 5;
		e.addComponent(bounds);
		
		Expires expires = new Expires();
		expires.delay = 5;
		e.addComponent(expires);
		
		SoundEffect sf = new SoundEffect();
		sf.effect = EFFECT.PEW;
		e.addComponent(sf);
		
		world.getManager(GroupManager.class).add(e, Constants.Groups.PLAYER_BULLETS);
		
		return e;
	}
	
	public static Entity createEnemyShip(World world, String name, Sprite.Layer layer, float health, float x, float y, float velocityX, float velocityY, float boundsRadius) {
		Entity e = world.createEntity();
		
		Position position = new Position();
		position.x = x;
		position.y = y;
		e.addComponent(position);
		
		Sprite sprite = new Sprite();
		sprite.name = name;
		sprite.r = 255/255f;
		sprite.g = 0/255f;
		sprite.b = 142/255f;
		sprite.layer = layer;
		e.addComponent(sprite);
		
		Velocity velocity = new Velocity();
		velocity.vectorX = velocityX;
		velocity.vectorY = velocityY;
		e.addComponent(velocity);
		
		Bounds bounds = new Bounds();
		bounds.radius = boundsRadius;
		e.addComponent(bounds);
		
		Health h = new Health();
		h.health = h.maximumHealth = health;
		e.addComponent(h);
		
		world.getManager(GroupManager.class).add(e, Constants.Groups.ENEMY_SHIPS);
		
		return e;
	}
	
	public static Entity createSmallExplosion(World world, float x, float y) {
		Entity e = createExplosion(world, x, y, 0.1f);
		
		SoundEffect sf = new SoundEffect();
		sf.effect = EFFECT.SMALLASPLODE;
		e.addComponent(sf);
		
		
		return e;
	}
	public static Entity createBigExplosion(World world, float x, float y) {
		Entity e = createExplosion(world, x, y, 0.5f);
		
		SoundEffect sf = new SoundEffect();
		sf.effect = EFFECT.ASPLODE;
		e.addComponent(sf);
		
		return e;
	}
	
	public static Entity createExplosion(World world, float x, float y, float scale) {
		Entity e = world.createEntity();
		
		Position position = new Position();
		position.x = x;
		position.y = y;
		e.addComponent(position);
		
		Sprite sprite = new Sprite();
		sprite.name = "explosion";
		sprite.scaleX = sprite.scaleY = scale;
		sprite.r = 1;
		sprite.g = 216/255f;
		sprite.b = 0;
		sprite.a = 0.5f;
		sprite.layer = Sprite.Layer.PARTICLES;
		e.addComponent(sprite);
		
		Expires expires = new Expires();
		expires.delay = 0.5f;
		e.addComponent(expires);
		
		ScaleAnimation scaleAnimation = new ScaleAnimation();
		scaleAnimation.active = true;
		scaleAnimation.max = scale;
		scaleAnimation.min = scale/100f;
		scaleAnimation.speed = -3.0f;
		scaleAnimation.repeat = false;
		e.addComponent(scaleAnimation);
		
		return e;
	}	
	
	public static Entity createStar(World world) {
		Entity e = world.createEntity();
		
		Position position = new Position();
		position.x = MathUtils.random(-Constants.FRAME_WIDTH/2, Constants.FRAME_WIDTH/2);
		position.y = MathUtils.random(-Constants.FRAME_HEIGHT/2, Constants.FRAME_HEIGHT/2);
		e.addComponent(position);
		
		Sprite sprite = new Sprite();
		sprite.name = "particle";
		sprite.scaleX = sprite.scaleY = MathUtils.random(0.5f, 1f);
		sprite.a = MathUtils.random(0.1f, 0.5f);
		sprite.layer = Sprite.Layer.BACKGROUND;
		e.addComponent(sprite);
		
		Velocity velocity = new Velocity();
		velocity.vectorY = MathUtils.random(-10f, -60f);
		e.addComponent(velocity);
		
		e.addComponent(new ParallaxStar());
		
		ColorAnimation colorAnimation = new ColorAnimation();
		colorAnimation.alphaAnimate = true;
		colorAnimation.repeat = true;
		colorAnimation.alphaSpeed = MathUtils.random(0.2f, 0.7f);
		colorAnimation.alphaMin = 0.1f;
		colorAnimation.alphaMax = 0.5f;
		e.addComponent(colorAnimation);
		
		return e;
	}
	
	public static Entity createParticle(World world, float x, float y) {
		Entity e = world.createEntity();
		
		Position position = new Position();
		position.x = x;
		position.y = y;
		e.addComponent(position);
		
		Sprite sprite = new Sprite();
		sprite.name = "particle";
		sprite.scaleX = sprite.scaleY = MathUtils.random(0.5f, 1f);
		sprite.r = 1;
		sprite.g = 216/255f;
		sprite.b = 0;
		sprite.a = 1f;
		sprite.layer = Sprite.Layer.PARTICLES;
		e.addComponent(sprite);
		
		float radians = MathUtils.random(2*MathUtils.PI);
		float magnitude = MathUtils.random(400f);
		 
		Velocity velocity = new Velocity();
		velocity.vectorX = magnitude * MathUtils.cos(radians);
		velocity.vectorY = magnitude * MathUtils.sin(radians);
		e.addComponent(velocity);
		
		Expires expires = new Expires();
		expires.delay = 1;
		e.addComponent(expires);

		ColorAnimation colorAnimation = new ColorAnimation();
		colorAnimation.alphaAnimate = true;
		colorAnimation.alphaSpeed = -1f;
		colorAnimation.alphaMin = 0f;
		colorAnimation.alphaMax = 1f;
		colorAnimation.repeat = false;
		e.addComponent(colorAnimation);

		return e;
	}

}
