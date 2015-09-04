import $ from "jquery"
import Bacon from "baconjs"
import R from "ramda"
import Victor from "victor"


const tickInterval = 100;
let tick = Bacon.interval(tickInterval);

let keyCodes = new Map();
keyCodes.set("left", 37);
keyCodes.set("up", 38);
keyCodes.set("right", 39);
keyCodes.set("down", 40);

function assertKey(evt, keyCode){ return evt.which === keyCode }
function isUpKey(evt) { return assertKey(evt, keyCodes.get("up")) }
function isDownKey(evt) { return assertKey(evt, keyCodes.get("down")) }
function isLeftKey(evt) { return assertKey(evt, keyCodes.get("left")) }
function isRightKey(evt) { return assertKey(evt, keyCodes.get("right")) }

let keyDownStream = Bacon.fromEvent(document.body, "keydown");
let upArrow = keyDownStream.filter(isUpKey);
let downArrow = keyDownStream.filter(isDownKey);
let leftArrow = keyDownStream.filter(isLeftKey);
let rightArrow = keyDownStream.filter(isRightKey);

let upDir = upArrow.map(new Victor(0, -1));
let downDir = downArrow.map(new Victor(0, 1));
let leftDir = leftArrow.map(new Victor(-1, 0));
let rightDir = rightArrow.map(new Victor(1, 0));

let dir = upDir.merge(downDir).merge(leftDir).merge(rightDir).toProperty(new Victor(0, 0));

function handleTick(prev, _, dir) {
  return prev.add(dir);
}

let pos = Bacon.update(
  new Victor(0, 0),
  [tick, dir], handleTick
);

let $hero = $("#hero");
pos.onValue(function(position) {
  $hero.attr("style", `left: ${position.x}px; top: ${position.y}px`);
});

