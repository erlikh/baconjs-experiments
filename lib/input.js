"use strict"
let Bacon = require("baconjs");
let keyCodes = require("./keyCodes");

let keyDownStream = Bacon.fromEvent(document.body, "keydown");
let keyVectorsStream = keyDownStream
  .map(".which")
  .map(keyCode => keyCodes.get(keyCode))

module.exports = keyVectorsStream;
