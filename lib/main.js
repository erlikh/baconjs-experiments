import $ from "jquery"
import Bacon from "baconjs"


function onCounterValue(sum) {
  $("#result").text(sum);
}

function isUpKey(evt) {
  return evt.which === 38
}

function isDownKey(evt) {
  return evt.which === 40
}

function add(x, y) { return x+y }

let keyDownStream = Bacon.fromEvent(document.body, "keydown");
let upArrow = keyDownStream.filter(isUpKey);
let downArrow = keyDownStream.filter(isDownKey);

let plus = $("#plus").asEventStream("click").merge(upArrow).map(1);
let minus = $("#minus").asEventStream("click").merge(downArrow).map(-1);

let both = plus.merge(minus);

let counter = both.scan(0, add);
counter.assign($("#result"), "text");

