"use strict";

function randomColor() {
  [].forEach.call(document.querySelectorAll(".color-text"), function (el) {
    el.style.color = `var(--color-text-${Math.floor(Math.random() * 10) + 1})`;
  });
}

/*
function randomColor() {
  [].forEach.call(document.querySelectorAll(".ct1"), function (el) {
    el.style.color = `#${Math.floor(Math.random() * (1 << 24)).toString(16)}`;
  });
}
*/

randomColor();
