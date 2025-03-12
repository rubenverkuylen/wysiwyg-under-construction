"use strict";
import { debounce, throttle } from "./modules/timing.js";
import PhotoSwipeLightbox from "./photoswipe-lightbox.esm.js";

// variables
const upcomingEvents = document
  .querySelector(".upcoming")
  .querySelector(".event-list");
const pastEvents = document.querySelector(".past").querySelector(".event-list");
const warning = document.getElementById("warning");
const gridItem = document.querySelectorAll(".grid-item");
const scrollDiv = document.querySelector("#item-programme");
const header = document.querySelector("header");

// Lightbox
//
const options = {
  gallery: "#gallery",
  children: ".gallery__item",
  pswpModule: () => import("./photoswipe.esm.js"),
};
const lightbox = new PhotoSwipeLightbox(options);
lightbox.on("uiRegister", function () {
  lightbox.pswp.ui.registerElement({
    name: "custom-caption",
    order: 9,
    isButton: false,
    appendTo: "root",
    html: "Caption text",
    onInit: (el, pswp) => {
      lightbox.pswp.on("change", () => {
        const currSlideElement = lightbox.pswp.currSlide.data.element;
        let captionHTML = "";
        if (currSlideElement) {
          const hiddenCaption = currSlideElement.querySelector(
            ".hidden-caption-content"
          );
          if (hiddenCaption) {
            // get caption from element with class hidden-caption-content
            captionHTML = hiddenCaption.innerHTML;
          } else {
            // get caption from alt attribute
            captionHTML = currSlideElement
              .querySelector("img")
              .getAttribute("alt");
          }
        }
        el.innerHTML = captionHTML || "";
      });
    },
  });
});
lightbox.init();

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

let counter = 0;
const renderProgramme = function (event) {
  let newDate = new Date(event.datestart.replace(/-/g, "/")).getTime();
  let urlCheck = event.url
    ? `<strong><a href="${event.url}" target="_blank">${event.urltext}</a></strong>`
    : "";

  if (newDate < getCurrentDate()) {
    counter++;
    if (counter > 20) {
      return;
    }
    const html = `
    <li class="event" data-index="${counter}">
    <h3>${event.title}</h3>
    <time>${event.datestart}${event.dateend ? " — " + event.dateend : ""}</time>
    <div class="event-location">${event.location}</div>
    <div class="event-description">${event.description}</div>
    </li>
    `;
    pastEvents.insertAdjacentHTML("beforeend", html);
  } else {
    warning.remove();

    const html = `
    <li class="event">
    <h3>${event.title}</h3>
    <time>${event.datestart}${event.dateend ? " — " + event.dateend : ""}</time>
    <div class="event-location">${event.location}</div>
    ${urlCheck}
    </li>
    `;
    upcomingEvents.insertAdjacentHTML("afterend", html);
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

// Header scroll
scrollDiv.addEventListener("scroll", throttle(scrollOpacity, 50), {
  passive: true,
});

function scrollOpacity() {
  let positionY = scrollDiv.scrollTop;
  let relativeY = Math.abs(
    positionY / (scrollDiv.scrollHeight - scrollDiv.clientHeight)
  );
  let relativeYRound = Math.round(relativeY * 1000) / 1000;
  let invertedY = 1 - relativeYRound;
  const sigmoidK = 20;
  let sigmoid = 1 / (1 + Math.exp(-1 * sigmoidK * (relativeYRound - 0.5)));
  header.style.opacity = invertedY;
  header.style.transform = `scale(${10 * relativeYRound + 1}) translateY(${
    sigmoid * 200
  }%)`;
  gridItem.forEach((el) => {
    el.style.filter = `invert(${sigmoid}`;
  });
}
