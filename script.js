"use strict";

// EMAIL ENCODER
var encEmail = "c29zQHRoZXNhZ2FvZnNhZ2UuY29tIA==";
const form = document.getElementsByClassName(".contact");
form.array.forEach((element) => {
  element.setAttribute("href", "mailto:".concat(atob(encEmail)));
});
// form.setAttribute("href", "mailto:".concat(atob(encEmail)));

function randomColor() {
  [].forEach.call(document.querySelectorAll(".color-text"), function (el) {
    el.style.color = `var(--color-text-${Math.floor(Math.random() * 10) + 1})`;
  });
}

randomColor();
