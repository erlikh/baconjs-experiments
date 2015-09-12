"use strict"
let R = require("ramda");
let vectors = require("../vectors");

function apple(positionStream) {
  let applePos = vectors.randomPos();

  return positionStream
    .filter(vectors.vectorEq(applePos))
    .take(1)
    .flatMapLatest(R.partial(apple, positionStream))
    .toProperty(applePos)
}

module.exports = apple;
