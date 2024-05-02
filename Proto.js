const spans = document.querySelectorAll(".word span");

spans.forEach((span, idx) => {
  span.addEventListener("click", (e) => {
    e.target.classList.add("active");
  });
  span.addEventListener("animationend", (e) => {
    e.target.classList.remove("active");
  });

  // Initial animation
  setTimeout(() => {
    span.classList.add("active");
  }, 750 * (idx + 1));
});

// const apiurl = "";
// const outputElement = (document.getElementById("city-input").value = "");
// const output = document.getElementById("out-put");

// First you need to fetch the website from where we going
// to fetch(urllink)-

// const response = await fetch();
// console.log(response);
// const data = await response.json();
// console.log(data);\
const cityname = "Brooklyn";
const zipcode = 11221;
const countrycode = "US";
const button = document.querySelectorAll(".submit-button");
const apikey = "b27226d32b98fe892632afdcc471e314";
const outputElement = document.getElementById("city-input");
const output = document.getElementById("out-put");
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=imperial`;

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const location = data.name;
    const feels = data.main.feels_like;
    const windspeed = data.wind.speed;
    const weather = data.weather[0].description.toLowerCase();

    let imageSource;
    switch (weather) {
      case "overcast clouds":
      case "scattered clouds":
        imageSource = "./src/1cloud.png";
        break;
      case "few clouds":
        imageSource = "./src/cloud.png";
        break;
      case "clear sky":
        imageSource = "./src/sun.png";
        break;
      case "shower rain":
      case "rain":
        imageSource = "./src/rain-2.png";
        break;
      case "thunderstorm":
        imageSource = "./src/storm-2.png";
        break;
      case "snow":
        imageSource = "./src/cloud.png";
        break;
      case "mist":
        imageSource = "./src/mist.png";
        break;
      default:
        imageSource = "";
    }

    const htmlContent = `
      <p>Temperature in ${location}: ${temperature}°F</p>
      <p>Weather: ${description}</p>
      <p>Feels Like: ${feels}</p>
      <p>Wind-Speed: ${windspeed} mph</p>
      ${imageSource ? `<img class="constant" src="${imageSource}">` : ""}
    `;

    output.innerHTML = htmlContent;
  })
  .catch((error) => {
    console.log("Error:", error);
  });
