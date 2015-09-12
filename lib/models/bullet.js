"use strict"
let Bacon = require("baconjs");
let R = require("ramda");
let draw = require("../draw");
let vectors = require("../vectors");


let tickStream = Bacon.interval(200);

function createBullet(startPos, applePos, bulletsBus) {
  let pos = R.clone(startPos);
  let bullet = draw.addBullet(pos);
  let animateBullet = R.partial(draw.animateBullet, bullet);

  let bulletStream = tickStream
    .map(vectors.basics.get("down"))
    .scan(pos, vectors.sum);

  // Remove bullter on collision with apple
  Bacon
    .combineAsArray(applePos, bulletStream)
    .filter(appleBull => vectors.eql(R.head(appleBull))(R.last(appleBull)))
    .onValue(function() {
      draw.removeBullet(bullet);
      unplug();
    });

  let unplug = bulletsBus.plug(bulletStream);

  bulletStream.onValue(animateBullet);
}

module.exports = createBullet;
