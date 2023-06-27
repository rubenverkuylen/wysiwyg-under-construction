"use strict";

// EMAIL ENCODER
var encEmail = "aW5mb0B3eXNpd3lnY2luZW1hLm5ldA==";
const form = document.getElementById("contact");
form.setAttribute("href", "mailto:".concat(atob(encEmail)));

function randomColor() {
  [].forEach.call(document.querySelectorAll(".color-text"), function (el) {
    el.style.color = `var(--color-text-${Math.floor(Math.random() * 10) + 1})`;
  });
}

randomColor();
