"use strict";
//Dark Mode
const darkMode = document.querySelector(".mode-container");
const htmlEl = document.querySelector("html");

darkMode.addEventListener("click", () => {
  htmlEl.classList.toggle("dark");
});
