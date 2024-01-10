"use strict";
// Search
const input = document.getElementById("input");
const searchBtn = document.getElementById("search-btn");

// Dropdown
const dropdown = document.querySelector(".dropdown");
const chevron = document.querySelector(".chevron");

// Dropdown Children
const dropdownFilter = document.querySelector(".filter");
const chevronImg = document.querySelector(".chevron img");

// Dropdown Menu
const dropdownMenu = document.querySelector(".dropdown-menu");

// Card Container
const loadMsg = document.getElementById("loading");
const cardContainer = document.querySelector(".card-container");

//Dark Mode
const darkMode = document.querySelector(".mode-container");
const htmlEl = document.querySelector("html");
const fetchDark = JSON.parse(localStorage.getItem("isDark"));

let fetchedData = [];
let selectedCountry;

if (fetchDark) htmlEl.classList.add("dark");
else htmlEl.classList.remove("dark");

const fetchData = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  cardContainer.innerHTML = "";
  loadMsg.classList.remove("hidden");
  const data = await response.json();
  loadMsg.classList.add("hidden");
  displayData(data);
  fetchedData = data;
};

const displayData = (data) => {
  cardContainer.innerHTML = "";

  data.forEach((element) => {
    const { common: name } = element.name;
    const population = element.population;
    const region = element.region;
    const { capital } = element;
    const flag = element.flags.svg;

    cardContainer.innerHTML += `   
    <a href="./countryPage/country.html">
    <div class="card" data-alt="${element.altSpellings[0]}">
      <div class="img-container">
      <img src="${flag}" alt="flag" />
      </div>
      <div class="text-container">
      <div class="info">
      <h2>${name}</h2>
      <p>Population: <span id="population">${population}</span></p>
      <p>Region: <span id="region">${region}</span></p>
      <p>Capital: <span id="capital">${
        capital !== undefined ? capital.flat()[0] : "Not defined"
      }</span></p>
        </div>
        </div>
        </div>
        </a>
        `;
  });
};

const filterName = (name) => {
  const filteredData = fetchedData.filter((item) => {
    return item.name.common.toLowerCase().startsWith(name.toLowerCase());
  });
  name ? displayData(filteredData) : displayData(fetchedData);
};

// Filter Region
dropdown.addEventListener("click", (e) => {
  dropdownMenu.classList.toggle("hidden");
  chevron.classList.toggle("inverted");

  const clicked = e.target;
  const selectedRegion = clicked.dataset.region;

  if (selectedRegion) {
    const filteredData = fetchedData.filter((item) => {
      return item.region === selectedRegion;
    });

    displayData(filteredData);
  }
});

searchBtn.addEventListener("click", () => {
  const inputValue = input.value.trim();
  input.value = "";

  filterName(inputValue);
});

cardContainer.addEventListener("click", (e) => {
  const cardElement = e.target.closest(".card");

  if (cardElement) {
    selectedCountry = cardElement.dataset.alt;
    localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
  }
});

"click keypress".split(" ").forEach((event) => {
  window.addEventListener(event, (e) => {
    if (e.code === "Enter") {
      const inputValue = input.value.trim();
      input.value = "";

      filterName(inputValue);
    }
    if (
      e.target !== dropdown &&
      e.target !== dropdownFilter &&
      e.target !== chevronImg
    ) {
      dropdownMenu.classList.add("hidden");
      chevron.classList.remove("inverted");
    }
  });
});

darkMode.addEventListener("click", () => {
  htmlEl.classList.toggle("dark");
  if (htmlEl.classList.contains("dark"))
    localStorage.setItem("isDark", JSON.stringify(true));
  else {
    localStorage.setItem("isDark", JSON.stringify(false));
  }
});

fetchData();
