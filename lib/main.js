import Bacon from "baconjs"
import R from "ramda"
import {addBullet, animateApple, animateBullet, animateHero, removeBullet} from "./draw"
import vectors from "./vectors"
import inputStream from "./input"
import createApple from "./models/apple"
import createBullet from "./models/bullet"

let directionsStream = inputStream
  .map(keyName => vectors.basics.get(keyName))
  .filter(R.identity);

let pos = directionsStream.scan(vectors.basics.get("zero"), vectors.sum);
pos.onValue(animateHero);

let bulletsBus = new Bacon.Bus();

let applePos = createApple(bulletsBus);
applePos.onValue(animateApple);

let spacesStream = inputStream.filter(R.equals("space"));

pos
  .sampledBy(spacesStream)
  .onValue((position) => createBullet(position, applePos, bulletsBus));
