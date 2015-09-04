import $ from "jquery"
import Bacon from "baconjs"
import R from "ramda"


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

let upDir = upArrow.map([0, -1]);
let downDir = downArrow.map([0, 1]);
let leftDir = leftArrow.map([-1, 0]);
let rightDir = rightArrow.map([1, 0]);

let dir = upDir.merge(downDir).merge(leftDir).merge(rightDir).toProperty([0, 0]);

let tick = Bacon.interval(1000);

function plusArr(first, second) {
  return [first[0]+second[0], first[1]+second[1]]
}

function handleTick(prev, _, dir) {
  return plusArr(prev, dir);
}

let pos = Bacon.update(
  [0, 0],
  [tick, dir], handleTick
);

const multiplier = 10;

function multiplyArr(multiplier) {
  return (arr) => [arr[0]*multiplier, arr[1]*multiplier]
}

let $hero = $("#hero");
pos.map(multiplyArr(multiplier)).onValues(function(left, top) {
  $hero.attr("style", `left: ${left}px; top: ${top}px`);
});

