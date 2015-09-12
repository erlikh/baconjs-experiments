"use strict"
let R = require("ramda");
let vectors = require("../vectors");

function createApple(positionStream) {
  let applePos = vectors.random();

  return positionStream
    .filter(vectors.eql(applePos))
    .take(1)
    .flatMapLatest(R.partial(createApple, positionStream))
    .toProperty(applePos)
}

module.exports = createApple;
