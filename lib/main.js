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
  .map(R.prop("which"))
  .map(keyCode => keyCodes.get(keyCode))
  .map(keyName => vectors.get(keyName))

let pos = keyVectorsStream.scan(vectors.get("zero"), (x, y) => x.add(y));

const $hero = $("#hero");
pos.onValue(function(position) {
  $hero.attr("style", `left: ${position.x}px; top: ${position.y}px`);
});
