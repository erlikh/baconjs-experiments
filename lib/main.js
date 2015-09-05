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
  .map(keyName => vectors.get(keyName) || vectors.get("zero"))

let pos = keyVectorsStream.scan(vectors.get("zero"), (x, y) => x.add(y));

let applePos = new Victor(0, 10);
let apple = pos
  .filter(vectorEq(applePos))
  .log()

function vectorEq(first) {
  return function(last) {
    return first.x === last.x && first.y === last.y
  }
}

drawApple(applePos);
pos.onValue(drawHero);

function drawApple(position) {
  position = position.toObject();
  $apple.attr("style", `left: ${position.x}px; top: ${position.y}px`);
}

function drawHero(position) {
  position = position.toObject();
  $hero.attr("style", `left: ${position.x}px; top: ${position.y}px`);
}
