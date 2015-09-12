import Bacon from "baconjs"
import R from "ramda"
import {addBullet, drawApple, drawBullet, drawHero, removeBullet} from "./draw"
import {vectors, vectorEq, sumVectors} from "./vectors"
import inputStream from "./input"
import apple from "./apple"


let directionsStream = inputStream
  .map(keyName => vectors.get(keyName))
  .filter(R.identity);

let pos = directionsStream.scan(vectors.get("zero"), sumVectors);
pos.onValue(drawHero);

let bulletsBus = new Bacon.Bus();

let appl = apple(bulletsBus);
appl.onValue(drawApple);

let spacesStream = inputStream.filter(R.equals("space"));

pos
  .sampledBy(spacesStream)
  .onValue(createBullet)

let tickStream = Bacon.interval(1000);

function createBullet(startPos) {
  let pos = R.clone(startPos);
  let bullet = addBullet(pos);
  let draw = R.partial(drawBullet, bullet);

  let bulletStream = tickStream
    .map(vectors.get("down"))
    .scan(pos, sumVectors)

  // Remove bullter on collision with apple
  Bacon
    .combineAsArray(appl, bulletStream)
    .filter(appleBull => vectorEq(R.head(appleBull))(R.last(appleBull)))
    .onValue(function() {
      removeBullet(bullet);
      unplug();
    });

  let unplug = bulletsBus.plug(bulletStream);

  bulletStream.onValue(draw)
}
