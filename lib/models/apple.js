"use strict"
let R = require("ramda");
let vectors = require("../vectors");

function apple(positionStream) {
  let applePos = vectors.random();

  return positionStream
    .filter(vectors.eql(applePos))
    .take(1)
    .flatMapLatest(R.partial(apple, positionStream))
    .toProperty(applePos)
}

module.exports = apple;
