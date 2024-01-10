"use strict";

//Dark Mode
const darkMode = document.querySelector(".mode-container");
const htmlEl = document.querySelector("html");
const fetchDark = JSON.parse(localStorage.getItem("isDark"));

const flag = document.querySelector(".flag img");

const commonName = document.getElementById("common-name");

const nativeName = document.getElementById("native-name");
const population = document.getElementById("population");
const region = document.getElementById("region");
const subRegion = document.getElementById("sub-region");
const capital = document.getElementById("capital");
const domain = document.getElementById("domain");
const currency = document.getElementById("currency");
const lang = document.getElementById("lang");

const borderInfo = document.querySelector(".border-info");

//LocalStorage Info
const fetchedCountry = JSON.parse(localStorage.getItem("selectedCountry"));

if (fetchDark) htmlEl.classList.add("dark");
else htmlEl.classList.remove("dark");

const fetchData = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  displayData(data);
};

const displayData = (data) => {
  data.forEach((country) => {
    if (country.altSpellings[0] === fetchedCountry) {
      const countryNativeName = Object.values(country.name.nativeName)[0]
        .official;

      flag.src = country.flags.svg;

      commonName.textContent = country.name.common;

      nativeName.textContent = countryNativeName;
      population.textContent = country.population;
      region.textContent = country.region;
      subRegion.textContent = country.subregion;
      capital.textContent = country.capital.flat()[0];

      domain.textContent = country.tld.flat()[0];
      currency.textContent = Object.keys(country.currencies);
      lang.textContent = Object.values(country.languages);

      if (!country.borders) {
        const borderCountryName = document.createElement("span");
        borderCountryName.textContent = "None";
        borderCountryName.setAttribute("id", "border");
        borderInfo.append(borderCountryName);
        return;
      }

      country.borders.forEach((borderC) => {
        const borderCountry = data.find((c) => c.cca3 === borderC);

        const borderCountryName = document.createElement("span");
        borderCountryName.textContent = borderCountry.name.common;
        borderCountryName.setAttribute("id", "border");
        borderInfo.append(borderCountryName);
      });
    }
  });
};

darkMode.addEventListener("click", () => {
  htmlEl.classList.toggle("dark");
  if (htmlEl.classList.contains("dark"))
    localStorage.setItem("isDark", JSON.stringify(true));
  else {
    localStorage.setItem("isDark", JSON.stringify(false));
  }
});

fetchData();
