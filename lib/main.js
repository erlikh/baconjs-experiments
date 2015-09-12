import Bacon from "baconjs"
import R from "ramda"
import {addBullet, drawApple, drawBullet, drawHero} from "./draw"
import {vectors, sumVectors} from "./vectors"
import inputStream from "./input"
import apple from "./apple"
import bullet from "./bullet"


let directionsStream = inputStream
  .map(keyName => vectors.get(keyName))
  .filter(R.identity);

let pos = directionsStream.scan(vectors.get("zero"), sumVectors);
pos.onValue(drawHero);

let appl = apple(pos);
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

  tickStream
    .map(vectors.get("down"))
    .scan(pos, sumVectors)
    .onValue(draw)
}
