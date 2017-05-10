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
    * `util.js`
    * `moving_object.js`
    * `asteroid.js`
    * `bullet.js`
    * `ship.js`
    * `game.js`
    * `game_view.js`

## Step 3: MovingObject
  * methods
    * constructor(options): passed {pos, vel, radius, color, game} through options
    * collideWith: empty and passed another object. Classes which inherit this method will be able to decipher what to do with the otherObject.
    * isCollideWith(otherObject): compares the center of this object and otherObject, and figures out whether or not they have collided.
    * draw(ctx): passed a canvas context, and draws on the canvas using beginPath, to fill.
    * move(timeDelta): given the time passed, determines the change of the object in that time, and updates the objects position.

## Step 4: Util
  * methods
    * dir(vec): normalizes the change in vector based on scale
    * dist(pos1, pos2): finds the distance between 2 points
    * norm(vec): figures out the speed of a object on it's vector
    * randomVec(length): produce a random vector given a length. This will be used for individual asteroids
