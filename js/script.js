// creating page header
let header = document.createElement("header");
header.className = "container text-center text-bg-dark fs-1";
header.textContent = "Country & temp Fetch API";
document.body.append(header);

/*----------------------------------- */

// creating container for displaying rest API country
let container = document.createElement("div");
container.className = "container";
document.body.append(container);

let row = document.createElement("div");
row.className = "row";
container.append(row);

// fetching required data from rest API

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      let capital = element.capital;
      if (capital == undefined) {
        capital = "N/A";
      }
      let region = element.region;
      let latlng = element.latlng;
      let CountryName = element.name.common;
      let flag = element.flags.png;
      let countrycode = element.cca3;
      let cardContainer = document.createElement("div");
      cardContainer.className = "col-lg-4 col-sm-12 p-3";
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3
      class="text-center bg-black text-bg-dark p-2"
      id="countryName">${CountryName}</h3>
        <img
        class="card-img img-fluid img-thumbnail"
        src="${flag}"
        alt="Card image"
        style="height:250px;object-fit:contain;"
        />
        <div class="text-center fs-6 p-1" id="capital">
        Capital : ${capital}</div>
        <div class="text-center fs-6 p-1" id="region">Region : ${region}</div>
        <div class="text-center fs-6 p-1" id="countryCode">
        Country Code : ${countrycode}
        </div>
        <div class="text-center fs-6 p-1" id="latlng">
        Coordinates : ${latlng}
        </div>
        <div class="d-flex align-items-center justify-content-center p-1">
        <button type="button" class="fs-6 btn btn-outline-primary" data-set="${CountryName}">
            Click for Weather
        </button>
    </div>`;
      cardContainer.append(card);
      row.append(cardContainer);
    });
  });

// adding event listener for buttons through document for updating weather
document.addEventListener("click", (e) => {
  if (e.target.type == "button") {
    if (e.target.innerText == "Click for Weather") {
      let displayCountry = e.target.dataset.set;
      getWeatherData(displayCountry)
        .then((weatherData) => {
          e.target.innerHTML = weatherData;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      e.target.innerText = "Click for Weather";
    }
  }
});

function getWeatherData(location) {
  const apiKey = "2eccac9cf0dd4165c2ae14a650b3d746";
  // 6eb1180161eccb06843669dbee0f87b3 got through online
  // 2eccac9cf0dd4165c2ae14a650b3d746 got through my mail
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let display = `Temp : ${data.main.temp} °C,  Condition : ${data.weather[0].main}`;
      return display;
    });
}
