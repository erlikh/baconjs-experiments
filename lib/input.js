"use strict"
let Bacon = require("baconjs");
let keyCodes = require("./keyCodes");

let keyDownStream = Bacon.fromEvent(document.body, "keydown")
  .map(".which")
  .map(keyCode => keyCodes.get(keyCode))

module.exports = keyDownStream;
