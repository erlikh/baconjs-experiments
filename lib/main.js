import $ from "jquery"
import Bacon from "baconjs"
import R from "ramda"
import keyCodes from "./keyCodes"
import draw from "./draw"
import {vectors, vectorEq, randomPos} from "./vectors"


var $hero = $("#hero");
var $apple = $("#apple");

let keyDownStream = Bacon.fromEvent(document.body, "keydown");
let keyVectorsStream = keyDownStream
  .map(".which")
  .map(keyCode => keyCodes.get(keyCode))
  .map(keyName => vectors.get(keyName))
  .filter(R.identity);

let pos = keyVectorsStream.scan(vectors.get("zero"), (x, y) => x.add(y));
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
