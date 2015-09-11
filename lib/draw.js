"use strict"
let $ = require("jquery");
let R = require("ramda");


let $apple = $("#apple");
let $hero = $("#hero");

let drawApple = R.partial(draw, $apple);
let drawHero = R.partial(draw, $hero);

function draw(object, position) {
  position = position.toObject();
  object.attr("style", `left: ${position.x}px; top: ${position.y}px`);
}

module.exports = {drawApple, drawHero};
