"use strict"
let $ = require("jquery");
let R = require("ramda");


let $apple = $("#apple");
let $bullet = $("<div class='bullet cell'></div>");
let $hero = $("#hero");

let animateApple = R.partial(animate, $apple);
let animateHero = R.partial(animate, $hero);
let animateBullet = animate;
const multiplier = 10;

function animate(object, position) {
  position = position.toObject();
  object.attr("style", `left: ${position.x*multiplier}px; top: ${position.y*multiplier}px`);
}

function addBullet(position) {
  let bullet = $bullet.clone();
  animate(bullet, position);
  bullet.appendTo("#scene");
  return bullet;
}

function removeBullet($bullet) {
  $bullet.remove();
}

module.exports = {
  addBullet, animateApple, animateBullet, animateHero, removeBullet
};
