"use strict"
let $ = require("jquery");
let R = require("ramda");


let $apple = $("#apple");
let $bullet = $("<div class='bullet cell'></div>");
let $hero = $("#hero");

let drawApple = R.partial(draw, $apple);
let drawHero = R.partial(draw, $hero);
let drawBullet = draw;

function draw(object, position) {
  position = position.toObject();
  object.attr("style", `left: ${position.x}px; top: ${position.y}px`);
}

function addBullet(position) {
  let bullet = $bullet.clone();
  draw(bullet, position);
  bullet.appendTo("#scene");
  return bullet;
}

module.exports = {addBullet, drawApple, drawBullet, drawHero};
