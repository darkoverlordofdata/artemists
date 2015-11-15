# Artemis
[![Build Status](https://travis-ci.org/darkoverlordofdata/artemists.svg?branch=master)](https://travis-ci.org/darkoverlordofdata/artemists)

Port of artemis-framework to typescript.
ArtemisTS requires TypeScript >= 1.5

[Play the demo](https://darkoverlordofdata.com/spaceship-warrior-ts/) at https://darkoverlordofdata.com/spaceship-warrior-ts/

The demo is a port of https://github.com/Flet/spaceship-warrior-redux and requires Pixi.js 3.0.7

#### Build
```bash
$ git clone https://github.com/darkoverlordofdata/artemists
$ cd artemists
$ npm install
$ tools/configure
$ npm run build
$ npm test
```

#### extensions
Components declare as pooled are auto pooled:

```typescript
@Pooled()
export class Position extends PooledComponent {
public static className = 'Position';
    public initialize(x:number=0, y:number=0) {
        this.x = x;
        this.y = y;
    }
    public x:number;
    public y:number;
}
```

BlackBoard & Entity Templates inspired by artemis_CSharp:

```typescript
@EntityTemplate('player')
export class PlayerTemplate implements artemis.IEntityTemplate {

    public buildEntity(entity:Entity, world:World, x:number, y:number):Entity {

        entity.addComponent(Position, x, y);
        entity.addComponent(Velocity, 0, 0);
        entity.addComponent(Bounds, 43);
        entity.addComponent(Health, 100, 100);
        entity.addComponent(Player);
        entity.addComponent(Sprite, 'fighter', 0x5dff81), (sprite) => {
            sprite.layer = Layer.ACTORS_3;
            sprite.addTo(EntitySystem.blackBoard.getEntry<PIXI.Container>('sprites'));
        });
        world.getManager<GroupManager>(GroupManager).add(entity, Constants.Groups.PLAYER_SHIP);
        return entity;
    }
}
...

var player = world.createEntityFromTemplate('player', x, y);
```

#### cli bolt-on

Entitas style api bolt-on generates component definitions.

```typescript
World.prototype.createPlayer = function(x:number, y:number):Entity {
    return this.createEntity("Player")
      .addPosition(x, y)
      .addVelocity(0, 0)
      .addBounds(43)
      .addHealth(100, 100)
      .addLayer(Layer.ACTORS_3)
      .addResource('fighter')
      .setPlayer(true)
      .start(Groups.PLAYER_SHIP);

};
...

var player = world.createPlayer(x, y);
```

Example at https://github.com/darkoverlordofdata/shmupwarz/tree/artemis


    Usage:
      arts init namespace [-t name]
      arts create -c name field:type... 
      arts create -s name superclass component...
      arts create -e name 
      arts create -x class name field:type...
      arts generate
    
    Options:
      -t  [--template]  # template name
      -c  [--component] # create a component
      -s  [--system]    # create a system
      -e  [--entity]    # create an entity
      -x  [--extension] # extend a class


# MIT License

Copyright (c) 2015 Bruce Davidson &lt;darkoverlordofdata@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

