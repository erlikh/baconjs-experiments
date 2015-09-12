"use strict"
let Bacon = require("baconjs");
let R = require("ramda");
let draw = require("../draw");
let vectors = require("../vectors");


let tickStream = Bacon.interval(1000);

function createBullet(startPos, appl, bulletsBus) {
  let pos = R.clone(startPos);
  let bullet = draw.addBullet(pos);
  let drawBullet = R.partial(draw.drawBullet, bullet);

  let bulletStream = tickStream
    .map(vectors.vectors.get("down"))
    .scan(pos, vectors.sumVectors);

  // Remove bullter on collision with apple
  Bacon
    .combineAsArray(appl, bulletStream)
    .filter(appleBull => vectors.vectorEq(R.head(appleBull))(R.last(appleBull)))
    .onValue(function() {
      draw.removeBullet(bullet);
      unplug();
    });

  let unplug = bulletsBus.plug(bulletStream);

  bulletStream.onValue(drawBullet);
}

module.exports = createBullet;
