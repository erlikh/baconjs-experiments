import $ from "jquery"
import Bacon from "baconjs"
import R from "ramda"
import draw from "./draw"
import {vectors, vectorEq, randomPos} from "./vectors"
import inputStream from "./input"


let $hero = $("#hero");
let $apple = $("#apple");

let directionsStream = inputStream
  .map(keyName => vectors.get(keyName))
  .filter(R.identity);

let pos = directionsStream.scan(vectors.get("zero"), (x, y) => x.add(y));
let appl = apple();

pos.onValue(R.partial(draw, $hero));
appl.onValue(R.partial(draw, $apple));

function apple() {
  let applePos = randomPos();

  return pos
    .filter(vectorEq(applePos))
    .take(1)
    .flatMapLatest(apple)
    .toProperty(applePos)
}
