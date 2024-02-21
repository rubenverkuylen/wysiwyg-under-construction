"use strict";
const events = document.querySelector(".events");
const warning = document.getElementById("warning");
const gridItem = document.querySelectorAll(".grid-item");

// Round border
gridItem.forEach((el) => {
  el.classList.add("radius");
});

// email encoder
var encEmail = "aW5mb0B3eXNpd3lnY2luZW1hLm5ldA==";
const form = document.getElementById("contact");
form.setAttribute("href", "mailto:".concat(atob(encEmail)));

// random color
function randomColor() {
  [].forEach.call(document.querySelectorAll(".color-text"), function (el, i) {
    setTimeout(() => {
      el.style.color = `var(--color-text-${
        Math.floor(Math.random() * 10) + 1
      })`;
      changeOrder(el);
    }, 10 * i);

    removeTransition(el);
  });
}

const changeOrder = function (el) {
  el.style.order = Math.floor(Math.random() * 10) + 1;
};

const removeTransition = function (el) {
  setTimeout(() => {
    el.style.transition = "0s";
    gridItem.forEach((e) => {
      e.style.transition = "0s";
    });
  }, 500);
};

setTimeout(() => {
  randomColor();
}, 600);

// programme generator from json

const getDataProgramme = function () {
  fetch("./programme.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (const event of data) {
        renderProgramme(event);
      }
    });
};
getDataProgramme();

const renderProgramme = function (event) {
  let newDate = new Date(event.datestart).getTime();
  let urlCheck = event.url
    ? `<strong><a href="${event.url}" target="_blank">${event.urltext}</a></strong>`
    : "";

  if (newDate < getCurrentDate()) {
    return;
  } else {
    warning.remove();

    const html = `
    <li class="event">
    <h3>${event.title}</h3>
    <time>${event.datestart}${event.dateend ? " — " + event.dateend : ""}</time>
    <div>${event.location}</div>
    ${urlCheck}
    </li>
    `;
    events.insertAdjacentHTML("beforeend", html);
  }
};

const getCurrentDate = function () {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;
  return date;
};
getCurrentDate();

// change transition
