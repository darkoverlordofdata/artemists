module brokenspork.core {

	import MathUtils = artemis.utils.MathUtils;	
	import Bounds = brokenspork.components.Bounds;
	import ColorAnimation = brokenspork.components.ColorAnimation;
	import Expires = brokenspork.components.Expires;
	import Health = brokenspork.components.Health;
	import ParallaxStar = brokenspork.components.ParallaxStar;
	import Player = brokenspork.components.Player;
	import Position = brokenspork.components.Position;
	import ScaleAnimation = brokenspork.components.ScaleAnimation;
	import SoundEffect = brokenspork.components.SoundEffect;
	import Sprite = brokenspork.components.Sprite;
	import Velocity = brokenspork.components.Velocity;

	import Constants = brokenspork.core.Constants;
	import Layer = brokenspork.components.Layer;
	import EFFECT = brokenspork.components.EFFECT;
	
	import World = artemis.World;
	import Entity = artemis.Entity;
	import GroupManager = artemis.managers.GroupManager;
	

	export class EntityFactory {
		
		
		public static createPlayer(game:CCLayer, world:World, x:number, y:number):Entity {
			var e:Entity = world.createEntity();
			
			var position:Position = new Position();
			position.x = x;
			position.y = y;
			e.addComponent(position);
			
			var sprite:Sprite = new Sprite();
			sprite.name = "fighter";
			sprite.r = 93;
			sprite.g = 255;
			sprite.b = 129;
			sprite.layer = Layer.ACTORS_3;
			e.addComponent(sprite);
			sprite.addTo(game);
			
			var velocity:Velocity = new Velocity();
			velocity.vectorX = 0;
			velocity.vectorY = 0;
			e.addComponent(velocity);
			
			var bounds:Bounds = new Bounds();
			bounds.radius = 43;
			e.addComponent(bounds);
			
			e.addComponent(new Player());
			
			world.getManager<GroupManager>(GroupManager).add(e, Constants.Groups.PLAYER_SHIP);
			
			return e;
		}
		
		public static createPlayerBullet(game:CCLayer, world:World, x:number, y:number):Entity {
			var e:Entity = world.createEntity();
			
			var position:Position = new Position();
			position.x = x;
			position.y = y;
			e.addComponent(position);
			
			var sprite:Sprite = new Sprite();
			sprite.name = "bullet";
			sprite.layer = Layer.PARTICLES;
			e.addComponent(sprite);
			sprite.addTo(game);

			var velocity:Velocity = new Velocity();
			velocity.vectorY = 800;
			e.addComponent(velocity);
			
			var bounds:Bounds = new Bounds();
			bounds.radius = 5;
			e.addComponent(bounds);
			
			var expires:Expires = new Expires();
			expires.delay = 5;
			e.addComponent(expires);
			
			var sf:SoundEffect = new SoundEffect();
			sf.effect = EFFECT.PEW;
			e.addComponent(sf);
			
			world.getManager<GroupManager>(GroupManager).add(e, Constants.Groups.PLAYER_BULLETS);
			
			return e;
		}
		
		public static createEnemyShip(game:CCLayer, world:World, name:string, layer:Layer, health:number, x:number, y:number, velocityX:number, velocityY:number, boundsRadius:number):Entity {
			var e:Entity = world.createEntity();
			
			var position:Position = new Position();
			position.x = x;
			position.y = y;
			e.addComponent(position);
			
			var sprite:Sprite = new Sprite();
			sprite.name = name;
			sprite.r = 255;
			sprite.g = 0;
			sprite.b = 142;
			sprite.layer = layer;
			e.addComponent(sprite);
			sprite.addTo(game);

			var velocity:Velocity = new Velocity();
			velocity.vectorX = velocityX;
			velocity.vectorY = velocityY;
			e.addComponent(velocity);
			
			var bounds:Bounds = new Bounds();
			bounds.radius = boundsRadius;
			e.addComponent(bounds);
			
			var h:Health = new Health();
			h.health = h.maximumHealth = health;
			e.addComponent(h);
			
			world.getManager<GroupManager>(GroupManager).add(e, Constants.Groups.ENEMY_SHIPS);
			
			return e;
		}
		
		public static createSmallExplosion(game:CCLayer, world:World, x:number, y:number):Entity {
			var e:Entity = this.createExplosion(game, world, x, y, 0.1);
			
			var sf:SoundEffect = new SoundEffect();
			sf.effect = EFFECT.SMALLASPLODE;
			e.addComponent(sf);

			return e;
		}
		public static createBigExplosion(game:CCLayer, world:World, x:number, y:number):Entity {
			var e:Entity = this.createExplosion(game, world, x, y, 0.5);
			
			var sf:SoundEffect = new SoundEffect();
			sf.effect = EFFECT.ASPLODE;
			e.addComponent(sf);

			return e;
		}
		
		
		public static createExplosion(game:CCLayer, world:World, x:number, y:number, scale:number):Entity {
			var e:Entity = world.createEntity();
			
			var position:Position = new Position();
			position.x = x;
			position.y = y;
			e.addComponent(position);
			
			var sprite:Sprite = new Sprite();
			sprite.name = "explosion";
			sprite.scaleX = sprite.scaleY = scale;
			sprite.r = 255;
			sprite.g = 216;
			sprite.b = 0;
			sprite.a = 128;
			sprite.layer = Layer.PARTICLES;
			e.addComponent(sprite);
			sprite.addTo(game);

			var expires:Expires = new Expires();
			expires.delay = 0.5;
			e.addComponent(expires);
			
			var scaleAnimation:ScaleAnimation = new ScaleAnimation();
			scaleAnimation.active = true;
			scaleAnimation.max = scale;
			scaleAnimation.min = scale/100;
			scaleAnimation.speed = -3.0;
			scaleAnimation.repeat = false;
			e.addComponent(scaleAnimation);
			
			return e;
		}	
		
		public static createStar(game:CCLayer, world:World):Entity {
			var e:Entity = world.createEntity();
			
			var position:Position = new Position();
			//position.x = MathUtils.random(-Constants.FRAME_WIDTH/2, Constants.FRAME_WIDTH/2);
			//position.y = MathUtils.random(-Constants.FRAME_HEIGHT/2, Constants.FRAME_HEIGHT/2);
			position.x = MathUtils.nextInt(Constants.FRAME_WIDTH/2);
			position.y = MathUtils.nextInt(Constants.FRAME_HEIGHT);
			e.addComponent(position);
			
			var sprite:Sprite = new Sprite();
			sprite.name = "particle";
			sprite.scaleX = sprite.scaleY = MathUtils.random(0.5, 1);
			sprite.a = MathUtils.random(127);
			sprite.layer = Layer.BACKGROUND;
			e.addComponent(sprite);
			sprite.addTo(game);

			var velocity:Velocity = new Velocity();
			velocity.vectorY = MathUtils.random(-10, -60);
			e.addComponent(velocity);
			
			e.addComponent(new ParallaxStar());
			
			var colorAnimation:ColorAnimation = new ColorAnimation();
			colorAnimation.alphaAnimate = true;
			colorAnimation.repeat = true;
			colorAnimation.alphaSpeed = MathUtils.random(0.2, 0.7);
			colorAnimation.alphaMin = 0;
			colorAnimation.alphaMax = 255;
			e.addComponent(colorAnimation);
			
			return e;
		}
		
		public static createParticle(game:CCLayer, world:World, x:number, y:number):Entity {
			var e:Entity = world.createEntity();
			
			var position:Position = new Position();
			position.x = x;
			position.y = y;
			e.addComponent(position);
			
			var sprite:Sprite = new Sprite();
			sprite.name = "particle";
			sprite.scaleX = sprite.scaleY = MathUtils.random(0.5, 1);
			sprite.r = 255;
			sprite.g = 216;
			sprite.b = 0;
			sprite.a = 1;
			sprite.layer = Layer.PARTICLES;
			e.addComponent(sprite);
			sprite.addTo(game);

			var radians:number = MathUtils.random(2*Math.PI);
			var magnitude:number = MathUtils.random(400);
			
			var velocity:Velocity = new Velocity();
			velocity.vectorX = magnitude * Math.cos(radians);
			velocity.vectorY = magnitude * Math.sin(radians);
			e.addComponent(velocity);
			
			var expires:Expires = new Expires();
			expires.delay = 1;
			e.addComponent(expires);
	
			var colorAnimation:ColorAnimation = new ColorAnimation();
			colorAnimation.alphaAnimate = true;
			colorAnimation.alphaSpeed = -1;
			colorAnimation.alphaMin = 0;
			colorAnimation.alphaMax = 1;
			colorAnimation.repeat = false;
			e.addComponent(colorAnimation);
	
			return e;
		}
	
	}
}
