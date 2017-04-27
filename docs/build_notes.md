# Goals
This project is meant to work through Webpack installation, testing JavaScript code using window.x = x, and render information from JavaScript objects on a page. Finally, it will use Canvas.js to draw objects.

## Webpack
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

module.exports and require break code into modules. Seeing as how web browsers do not have this functionality, we do it for them.

### Module Bundlers

module.exports and require break code into modules. Seeing as how web browsers do not have this functionality, we do it for them.
