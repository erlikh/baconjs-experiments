import R from "ramda"
import {drawApple, drawHero} from "./draw"
import {vectors, vectorEq, randomPos} from "./vectors"
import inputStream from "./input"


let $hero = $("#hero");
let $apple = $("#apple");

let directionsStream = inputStream
  .map(keyName => vectors.get(keyName))
  .filter(R.identity);

let pos = directionsStream.scan(vectors.get("zero"), (x, y) => x.add(y));
let appl = apple();

pos.onValue(drawHero);
appl.onValue(drawApple);

function apple() {
  let applePos = randomPos();

  return pos
    .filter(vectorEq(applePos))
    .take(1)
    .flatMapLatest(apple)
    .toProperty(applePos)
}
