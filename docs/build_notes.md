## Step 1: Webpack
### Background
Without Webpack, we could write multiple files into the head HTML documents such that the browser could execute each one in order like so:

```
<body>
  ...
  <script src="app/util.js"></script>
  <script src="app/game.js"></script>
  <script src="app/index.js"></script>
</body>

```
The order would be key for each of the dependencies need to be loaded before the dependent object. In this case index relies on game which relies on util.

In Node each file has its own global namespace, however, in the browser there is a single global namespace, called `window`, which is shared across all JavaScript files.

### Module Bundlers
'Bundling' your code breaks your code into pre-digested bits built for the browser without having to list all your files out in order. This is achieved by running though all source files and bundling them into a single file to be referenced in a single script tag. In order for this work each file requires dependencies explicitly at the tope, and then exports the object the file is creating.

```
class ExampleCode {
  code() {
    // ...
  }
}

module.exports = ExampleCode;
```

`module.exports` and `require` break code into these digestible modules, which means we do not need to worry about the order because the bundler will load the files declared in `require` first so the dependents are loaded last.

### Enter npm
  1. Create `index.html` like so:
    ```
    <html>
      <head>
        <meta charset="utf-8">
        <title>Asteroids</title>
      </head>
      <body>
      </body>
    </html>

    ```
  2. Run `npm install -g webpack` to install webpack.
  3. Navigate to app directory and run `webpack app.js bundle.js`
  4. In your head HTML file add the following script tag
    ```
    <body>
      <script src="dist/bundle.js"> </script>
    </body>
    ```

## Step 2: Add files
  * create `app` folder
  * inside `app` folder:
    * `moving_object.js`
    * `util.js`
    * `asteroid.js`
    * `bullet.js`
    * `ship.js`
    * `game.js`
    * `game_view.js`

## Step 3: MovingObject
  * methods
    * constructor(options): passed {pos, vel, radius, color, game} through options
    * collideWith: empty and passed another object. Classes which inherit this method will be able to decipher what to do with the otherObject
    * isCollideWith(otherObject): compares the center of this object and otherObject, and figures out whether or not they have collided
    * draw(ctx): passed a canvas context, and draws on the canvas using beginPath, to fill
    * move(timeDelta): given the time passed, determines the change of the object in that time, and updates the objects position

## Step 4: Util
  * methods
    * dir(vec): normalizes the change in vector based on scale
    * dist(pos1, pos2): finds the distance between 2 points
    * norm(vec): figures out the speed of a object on it's vector
    * randomVec(length): produce a random vector given a length. This will be used for individual asteroids
    * scale(vec, m): scale the length of the vector by the given amount or norm. Used in dir
    * wrap(coord, max): This allows the canvas to be wrappable, such that none of the objects are out of bounds

## Step 5: Asteroid extends MovingObject
  * methods
    * constructor(options): passed color, position, radius, and velocity, as well as anything else inherited from MovingObject
    * collideWith(otherObject): completes the empty method from MovingObject which will relocate a ship, as it would be destroyed if they collide, OR removes the asteroid from the game if it is hit by a bullet

## Step 6: Game
  * methods
    * constructor(): the game keeps track of the asteroids, bullets, and ships in the game
    * add(object): adds each object to track in the game
    * addAsteroids(): adds all asteroids to the game
    * addShip(): adds the player to the game
    * allObjects(): iterates through each object in the game and adds them
    * checkCollisions(): checks Collisions of all objects active in the game
    * draw(ctx): calls the draw function on each object within the game
    * isOutOfBounds(pos):checks whether an object is outOfBounds
    * moveObjects(delta):moves each object given the time difference delta
    * randomPosition(): renders an object given a randomposition within the canvas
    * remove(object): removes an object from the game (upon collision)
    * step(delta): moves each objects and checks their collisions
    * wrap(pos): wraps the position if the object's vector is moving past the canvas frame

## Step 7: Game View    
  * methods
    * constructor(): tracks the game, canvas context, and player's ship
    * bindKeyHandlers(): binds keys for movement to canvas context
      * use [keymaster library](https://github.com/madrobby/keymaster) in order to set the keys
    * start(): starts the game
    * animate(): calculates the timeDelta since the last move, steps each object, and draws each object on the canvas

## Step 8: Asteroids (entry file)    
  * interacts with DOM retrieving the canvas and the context
  * starts the game on key press
  * add canvas element to `index.html`
    ```
    <body>
      <div class="game-container">
        <canvas id="canvas"></canvas>
      </div>
    </body>
    ```
