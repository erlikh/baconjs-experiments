import $ from "jquery"
import Bacon from "baconjs"
import R from "ramda"
import Victor from "victor"
import keyCodes from "./keyCodes"


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
  .filter(R.identity)

let pos = keyVectorsStream.scan(vectors.get("zero"), (x, y) => x.add(y));
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

function drawApple(position) {
  position = position.toObject();
  $apple.attr("style", `left: ${position.x}px; top: ${position.y}px`);
}

function drawHero(position) {
  position = position.toObject();
  $hero.attr("style", `left: ${position.x}px; top: ${position.y}px`);
}
