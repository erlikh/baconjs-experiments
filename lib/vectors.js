"use strict"
let Victor = require("victor");


let basics = new Map();
basics.set("up", new Victor(0, -1));
basics.set("down", new Victor(0, 1))
basics.set("left", new Victor(-1, 0));
basics.set("right", new Victor(1, 0));
basics.set("zero", new Victor(0, 0));

function eql(first) {
  return function(last) {
    return first.x === last.x && first.y === last.y
  }
}

function random() {
  var topLeft = new Victor(0, 0);
  var bottomRight = new Victor(30, 30);
  return new Victor(10, 10).randomize(topLeft, bottomRight);
}

function sum(first, second) {
  return first.add(second);
}

module.exports = {basics, eql, random, sum};
