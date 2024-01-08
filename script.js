"use strict";
// Search
const input = document.getElementById("input");
const searchBtn = document.getElementById("search-btn");

// Dropdown
const dropdown = document.querySelector(".dropdown");
const chevron = document.querySelector(".chevron");

// Dropdown Menu
const dropdownMenu = document.querySelector(".dropdown-menu");

// Card Container
const loadMsg = document.getElementById("loading");
const cardContainer = document.querySelector(".card-container");

let fetchedData = [];

const fetchData = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => {
      cardContainer.innerHTML = "";
      loadMsg.classList.remove("hidden");
      return res.json();
    })
    .then((data) => {
      loadMsg.classList.add("hidden");
      displayData(data);
      fetchedData = data;
    });
};

const displayData = (data) => {
  cardContainer.innerHTML = "";

  data.forEach((element) => {
    const { common: name } = element.name;
    const population = element.population;
    const region = element.region;
    const { capital } = element;
    const flag = element.flags.png;

    cardContainer.innerHTML += `   <div class="card">
      <div class="img-container">
      <img src="${flag}" alt="flag" />
      </div>
      <div class="text-container">
      <div class="info">
      <h2>${name}</h2>
      <p>Population: <span id="population">${population}</span></p>
      <p>Region: <span id="region">${region}</span></p>
      <p>Capital: <span id="capital">${
        capital !== undefined ? capital : "Not defined"
      }</span></p>
        </div>
        </div>
        </div>`;
  });
};

const filterName = (name) => {
  const filteredData = fetchedData.filter((item) => {
    return item.name.common.toLowerCase() === name.toLowerCase();
  });
  name ? displayData(filteredData) : displayData(fetchedData);
};

const filterRegion = () => {
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
};

searchBtn.addEventListener("click", () => {
  const inputValue = input.value.trim();
  input.value = "";

  filterName(inputValue);
});

filterRegion();
fetchData();
