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
1. Run `npm install -g webpack` to install webpack.
2. Navigate to app directory and run `webpack app.js bundle.js`
3. In your head HTML file add the following script tag
  ```
  <body>
    <script src="dist/bundle.js"> </script>
  </body>
  ```
