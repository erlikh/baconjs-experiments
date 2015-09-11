"use strict"

let Victor = require("victor");

let vectors = new Map();
vectors.set("up", new Victor(0, -1));
vectors.set("down", new Victor(0, 1))
vectors.set("left", new Victor(-1, 0));
vectors.set("right", new Victor(1, 0));
vectors.set("zero", new Victor(0, 0));

function sumVectors(first, second) {
  return first.add(second);
}

function vectorEq(first) {
  return function(last) {
    return first.x === last.x && first.y === last.y
  }
}

function randomPos() {
  var topLeft = new Victor(0, 0);
  var bottomRight = new Victor(30, 30);
  return new Victor(10, 10).randomize(topLeft, bottomRight);
}

module.exports = {vectors, vectorEq, randomPos, sumVectors};
