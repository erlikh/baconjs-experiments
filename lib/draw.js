"use strict"

function draw(object, position) {
  position = position.toObject();
  object.attr("style", `left: ${position.x}px; top: ${position.y}px`);
}

module.exports = draw;
