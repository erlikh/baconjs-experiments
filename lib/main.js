import $ from "jquery"
import Bacon from "baconjs"
import R from "ramda"
import Victor from "victor"
import keyCodes from "./keyCodes"


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

let pos = keyVectorsStream.scan(vectors.get("zero"), (x, y) => x.add(y));

let applePos = new Victor(0, 10);
let apple = pos
  .filter(p => p.x == applePos.x && p.y === applePos.y)
  .log()

drawApple(applePos);
pos.onValue(drawHero);

const $hero = $("#hero");
function drawApple(position) {
  $apple.attr("style", `left: ${position.x}px; top: ${position.y}px`);
}

const $apple = $("#apple");
function drawHero(position) {
  $hero.attr("style", `left: ${position.x}px; top: ${position.y}px`);
}
