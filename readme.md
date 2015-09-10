# Artemis
[![Build Status](https://travis-ci.org/darkoverlordofdata/artemists.svg?branch=master)](https://travis-ci.org/darkoverlordofdata/artemists)

Port of artemis-framework to typescript.

plan demo using typescript port of https://github.com/Flet/spaceship-warrior-redux
replacing gdx with cocos2d-js

Requires TypeScript 1.5

Example uses cocos2d-x 3.7

#### Build
```bash
$ git clone https://github.com/darkoverlordofdata/artemists
$ cd artemists
$ npm install
$ tools/configure
$ npm run build
$ npm test
```
#### Status
Artemis port complete. 
Current phase: burn-in

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
        entity.addComponent(Player);
        entity.addComponent(Sprite, 'fighter', cc.color(93, 255, 129), (sprite) => {
            sprite.layer = Layer.ACTORS_3;
            sprite.addTo(EntitySystem.blackBoard.getEntry<cc.Layer>('game'));
        });
        world.getManager<GroupManager>(GroupManager).add(entity, Constants.Groups.PLAYER_SHIP);
        return entity;
    }
}
...

var player = world.createEntityFromTemplate('player', x, y);
```

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

