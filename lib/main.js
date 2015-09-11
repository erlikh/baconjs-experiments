import $ from "jquery"
import Bacon from "baconjs"
import R from "ramda"
import Victor from "victor"
import keyCodes from "./keyCodes"
import draw from "./draw"

var $hero = $("#hero");
var $apple = $("#apple");

let vectors = new Map();
vectors.set("up", new Victor(0, -1));
vectors.set("down", new Victor(0, 1))
vectors.set("left", new Victor(-1, 0));
vectors.set("right", new Victor(1, 0));
vectors.set("zero", new Victor(0, 0));

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

function vectorEq(first) {
  return function(last) {
    return first.x === last.x && first.y === last.y
  }
}

function randomPos() {
  var topLeft = new Victor(0, 0);
  var bottomRight = new Victor(30, 30);
  return new Victor(10, 10).randomize(topLeft, bottomRight);
}
