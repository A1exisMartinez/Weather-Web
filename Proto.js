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
// const cityname = "new york city";
const zipcode = 11221;
const countrycode = "US";
const apikey = "b27226d32b98fe892632afdcc471e314";
const outputElement = document.getElementById("city-input");
const output = document.getElementById("out-put");

const button = document.querySelector("#city-button");
button.addEventListener("click", async function () {
  const city = outputElement.value;
  const responsedata = await fetchweatherData(city);
  displayweatherData(responsedata);
});
// don't touch this!!! unless you want to pass in another
// prarmeter like the zip-code and city in the future!
const fetchweatherData = async function (city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      if (response.status === 404) {
        const img404 = document.createElement("img");
        img404.src = "./src/404-error.png"; // Set the source of the image
        img404.alt = "Error 404";
        output.innerHTML = "Please Submit In a Correct City Name!";
        output.appendChild(img404);
        console.log(response);
      } else if (response.status === 400) {
        const img400 = document.createElement("img");
        img400.src = "./src/browser.png"; // Set the source of the image
        img400.alt =
          "You can get 400 error if either some mandatory parameters in the request are missing or some of request parameters have incorrect format or values out of allowed range.";
        output.innerHTML = "Please Make Sure You Are Entering All Inputs";
        output.appenedChild(img400);
      } else if (response.status === 401) {
        const img401 = docuemnt.createElement("img");
        img401.src = "./src/browser.png"; // Set the source of the image
        img401.alt =
          "You can get 401 error if API token did not providen in the request or in case API token provided in the request does not grant access to this API.";
        output.innerHTML =
          "Please Make Sure You Entered The Correct API token provided!";
        output.appenedChild(img401);
      } else if (response.status === 429) {
        const img429 = docuemnt.createElement("img");
        img429.src = "./src/browser.png"; // Set the source of the image
        img429.alt = "Too Many Requests Being Made Currently.";
        output.innerHTML =
          "Please Make Sure You Entered The Correct API token provided!";
        output.appenedChild(img429);
      } else {
        const imageError = docuemnt.createElement("img");
        imageError.src = "./src/browser.png"; // Set the source of the image
        imageError.alt = "Something Went Wrong On Our Part.";
        output.innerHTML = "Error";
        output.appenedChild(imageError);
      }
    }

    const responsedata = await response.json();
    return responsedata;
  } catch (error) {
    console.log("You have an error");
    console.log(error);
  }
};
//
// purpose: take weather data (that's already been fetched)
// and display it
const displayweatherData = function (data) {
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
    case "broken clouds":
      imageSource = "./src/cloudy.png";
      break;
    case "clear sky":
      imageSource = "./src/sun.png";
      break;
    case "shower rain":
    case "rain":
    case "light intensity drizzle":
    case "drizzle":
    case "heavy intensity drizzle":
    case "drizzle rain":
    case "heavy intensity drizzle rain":
    case "heavy shower rain and drizzle":
    case "shower drizzle":
    case "light rain":
    case "moderate rain":
    case "heavy intensity rain":
    case "very heavy rain":
    case "extreme rain":
    case "light intensity shower rain":
    case "shower rain":
    case "heavy intensity shower rain":
    case "ragged shower rain":
      imageSource = "./src/rain-2.png";
      break;
    case "thunderstorm":
    case "light thunderstorm":
    case "heavy thunderstorm":
    case "ragged thunderstorm":
      imageSource = "./src/storm.png";
      break;
    case "freezing rain":
      imageSource = "./src/snowcloud.png";
      break;
    case "thunderstorm with light rain":
    case "thunderstorm with rain":
    case "thunderstorm with heavy rain":
    case "thunderstorm with light drizzle":
    case "thunderstorm with heavy drizzle":
      imageSource = "./src/storm-2.png";
      break;
    case "snow":
    case "light snow":
    case "heavy snow":
    case "sleet":
    case "light shower sleet":
    case "light rain and snow":
    case "shower sleet":
    case "light rain and snow":
    case "rain and snow":
    case "light shower snow":
    case "shower snow":
    case "heavy":
      imageSource = "./src/snowy.png";
      break;
    //atmosphere weather below
    case "mist":
      imageSource = "./src/mist.png";
      break;
    case "haze":
      imageSource = "./src/fog.png";
      break;
    case "tornado":
      imageSource = "./src/hurricane.png";
      break;
    case "dust":
      imageSource = "./src/dust-2.png";
      break;
    case "sand/dust whirls":
      imageSource = "./src/dust-2.png";
      break;
    case "volcanic ash":
      imageSource = "./src/volcanic.png.png";
      break;
  }

  const htmlContent = `
  <p>Temperature in ${location}: ${temperature}°F</p>
  <p>Weather: ${description}</p>
  <p>Feels Like: ${feels}</p>
  <p>Wind-Speed: ${windspeed} mph</p>
  ${imageSource ? `<img class="constant" src="${imageSource}">` : ""}
`;

  output.innerHTML = htmlContent;
};
