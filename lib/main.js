import $ from "jquery"
import Bacon from "baconjs"


function onCounterValue(sum) {
  $("#result").text(sum);
}

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

function add(x, y) { return x+y }

let keyDownStream = Bacon.fromEvent(document.body, "keydown");
let upArrow = keyDownStream.filter(isUpKey);
let downArrow = keyDownStream.filter(isDownKey);
let leftArrow = keyDownStream.filter(isLeftKey);
let rightArrow = keyDownStream.filter(isRightKey);

let upDir = upArrow.map([0, -1]);
let downDir = downArrow.map([0, 1]);
let leftDir = leftArrow.map([-1, 0]);
let rightDir = rightArrow.map([1, 0]);

let dir = upDir.merge(downDir).merge(leftDir).merge(rightDir);
dir.log();

let plus = $("#plus").asEventStream("click").merge(upArrow).map(1);
let minus = $("#minus").asEventStream("click").merge(downArrow).map(-1);

let both = plus.merge(minus);

let counter = both.scan(0, add);
counter.assign($("#result"), "text");

